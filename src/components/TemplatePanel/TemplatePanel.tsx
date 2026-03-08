import type { Template } from '../../templates/types';
import './TemplatePanel.css';

interface TemplatePanelProps {
  templates: Template[];
  onInsert: (template: Template) => void;
}

const CATEGORY_ORDER = ['scaffold', 'io', 'collections', 'algorithm'];
const CATEGORY_LABELS: Record<string, string> = {
  scaffold: 'Scaffold',
  io: 'I/O',
  collections: 'Collections',
  algorithm: 'Algorithm',
};

export function TemplatePanel({ templates, onInsert }: TemplatePanelProps) {
  const grouped = CATEGORY_ORDER.map(cat => ({
    cat,
    items: templates.filter(t => t.category === cat),
  })).filter(g => g.items.length > 0);

  return (
    <div className="template-panel">
      {grouped.map(({ cat, items }) => (
        <div key={cat} className="template-group">
          <span className="template-group-label">{CATEGORY_LABELS[cat] ?? cat}</span>
          <div className="template-row">
            {items.map(t => (
              <button
                key={t.id}
                className="template-btn"
                onClick={() => onInsert(t)}
                title={t.label}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
