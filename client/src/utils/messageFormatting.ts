const escapeHtml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatInline = (text: string) =>
  escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const isSeparatorRow = (cells: string[]) =>
  cells.every(cell => /^-+$/.test(cell.trim()));

const buildTableRow = (cells: string[], asHeader = false) => {
  const tag = asHeader ? 'th' : 'td';
  const cellHtml = cells.map(cell => `<${tag}>${formatInline(cell.trim())}</${tag}>`).join('');
  return `<tr>${cellHtml}</tr>`;
};

/**
 * Convert structured AI text (lists, tables, bold) into simple HTML.
 */
export const formatAiResponse = (response: string) => {
  const lines = response.split('\n');
  const parts: string[] = [];
  let listItems: string[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (listItems.length) {
      parts.push(`<ul>${listItems.join('')}</ul>`);
      listItems = [];
    }
  };

  const flushTable = () => {
    if (!tableRows.length) return;

    const cleanedRows = tableRows.filter(row => row.length > 1 && !isSeparatorRow(row));
    if (!cleanedRows.length) {
      tableRows = [];
      return;
    }

    const [headerRow, ...bodyRows] = cleanedRows;
    const headerHtml = buildTableRow(headerRow, true);
    const bodyHtml = bodyRows.map(row => buildTableRow(row)).join('');

    parts.push(`<div class="ai-table"><table>${headerHtml}${bodyHtml}</table></div>`);
    tableRows = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const isTableRow = /^\|.*\|$/.test(line);
    const isListItem = /^[-*]\s+/.test(line);

    if (!line) {
      flushList();
      flushTable();
      continue;
    }

    if (isTableRow) {
      flushList();
      const cells = line.split('|').slice(1, -1).map(cell => cell.trim());
      tableRows.push(cells);
      continue;
    }

    if (isListItem) {
      flushTable();
      const item = line.replace(/^[-*]\s+/, '');
      listItems.push(`<li>${formatInline(item)}</li>`);
      continue;
    }

    flushList();
    flushTable();
    parts.push(`<p>${formatInline(line)}</p>`);
  }

  flushList();
  flushTable();

  // If nothing special was built, still return safely formatted text.
  if (!parts.length) return formatInline(response);

  return parts.join('');
};

export const formatUserMessage = (text: string) =>
  formatInline(text).replace(/\n/g, '<br />');

export const safeHtml = {
  escapeHtml,
  formatInline,
};
