import './SuggestedActions.css';

interface SuggestedActionsProps {
  actions: string[];
  onActionClick: (action: string) => void;
  disabled?: boolean;
}

const SuggestedActions = ({ actions, onActionClick, disabled }: SuggestedActionsProps) => {
  return (
    <div className="suggested-actions">
      {actions.map(action => (
        <button
          key={action}
          className="action-btn"
          onClick={() => onActionClick(action)}
          disabled={disabled}
        >
          {action}
        </button>
      ))}
    </div>
  );
};

export default SuggestedActions;

