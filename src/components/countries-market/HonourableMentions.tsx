import type { HonourableMentionGroup } from '../../api';

interface HonourableMentionsProps {
  groups: HonourableMentionGroup[];
}

/**
 * Stablecoins worth naming that are not in a country's main list, grouped by why
 * they are excluded. Exists so a page can say plainly what it is leaving out —
 * on the US page the two largest dollar stablecoins are both absent from the
 * headline table, which would read as an error if left unexplained.
 */
export function HonourableMentions({ groups }: HonourableMentionsProps) {
  if (groups.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-chrome-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-chrome-100">
        <h2 className="text-lg font-semibold text-chrome-900">Honourable Mentions</h2>
        <p className="text-sm text-chrome-500 mt-1">
          Significant dollar stablecoins outside the list above, and why they sit outside it
        </p>
      </div>

      <div className="divide-y divide-chrome-100">
        {groups.map((group) => (
          <div key={group.category} className="px-6 py-4">
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-chrome-900">{group.category}</h3>
              {group.blurb && (
                <p className="text-xs text-chrome-500 mt-0.5 leading-relaxed">{group.blurb}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.entries.map((entry) => (
                <div
                  key={entry.symbol}
                  className="border border-chrome-200 rounded-lg px-4 py-3 bg-chrome-50"
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-chrome-900">{entry.symbol}</span>
                    {entry.supply && (
                      <span className="text-xs font-semibold text-chrome-700">{entry.supply}</span>
                    )}
                  </div>
                  <p className="text-xs text-chrome-600 truncate">{entry.name}</p>
                  <p className="text-[11px] text-chrome-400 truncate">{entry.issuer}</p>
                  {entry.note && (
                    <p className="text-[11px] text-chrome-500 mt-1.5 leading-relaxed">{entry.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
