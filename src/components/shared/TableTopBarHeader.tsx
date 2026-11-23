interface TableHeaderProps {
  title?: string;
}

/** Page title for admin list pages. The "where am I" trail lives in the admin
 *  top bar (AdminBreadcrumb), so this is the heading alone. */
const TableTopBarHeader = ({ title }: TableHeaderProps) => {
  return (
    <div className="w-full min-w-0">
      {title && (
        <h1 className="text-2xl font-semibold tracking-tight text-secondary-dark">
          {title}
        </h1>
      )}
    </div>
  );
};

export default TableTopBarHeader;
