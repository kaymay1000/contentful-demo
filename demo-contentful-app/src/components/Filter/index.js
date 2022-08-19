import './filter.scss'
const Filter = (props) => {

  let {tag, handleFilterChange} = props;

  return (
    <div className="filter-item">
      <input
        multiple
        placeholder="Filter projects"
        className="filter-input"
        id={tag.sys.id} // tag.sys.id must be used (instead of tag.name) in order for handleFilterChange and filterProjects to work properly
        type="checkbox"
        onChange={handleFilterChange}
      />
      <label htmlFor={tag.sys.id} className="filter-label">{tag.name}</label>
    </div>
  )
}

export default Filter;
