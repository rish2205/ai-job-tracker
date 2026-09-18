import { APPLICATION_STATUSES } from "../../utils/constants";

function JobFilters({
  company,
  status,
  onCompanyChange,
  onStatusChange,
  onClear,
}) {
  const hasFilters = company || status;

  return (
    <div className="application-filters">
      <div className="filter-search">
        <span className="filter-search-icon">
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search by company..."
          value={company}
          onChange={(event) =>
            onCompanyChange(event.target.value)
          }
        />
      </div>

      <div className="filter-status">
        <span className="filter-label">
          STATUS
        </span>

        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value)
          }
        >
          <option value="">
            All statuses
          </option>

          {APPLICATION_STATUSES.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>
      </div>

      <button
        type="button"
        className="filter-clear-button"
        onClick={onClear}
        disabled={!hasFilters}
      >
        Clear filters
      </button>
    </div>
  );
}

export default JobFilters;