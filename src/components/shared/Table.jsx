import React, { useState } from "react";
import Proptypes from "prop-types";

import { OverflowWrapper } from "@components/performance/reviews/Reviews";
import { ResponsiveTableLoader } from "@components/shared/SkeletonLoader";
import Divider from "@components/shared/Divider";
import EmptyState from "@components/shared/EmptyState";
import ResponsiveImage from "@components/shared/ResponsiveImage";
import Pagination from "@components/shared/table/Pagination";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Edit2,
  MoreVertical,
  Eye,
} from "lucide-react";
import HandleClickEvent from "../click/HandleClickEvent";
import DropDown from "@components/shared/DropDown";

const CustomCheckBox = ({ checked, onClick }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="h-full flex absolute px-[0.7rem]"
    >
      <input
        type="checkbox"
        name=""
        id=""
        checked={checked}
        onClick={onClick}
        className="cursor-pointer accent-primary-600"
      />
    </div>
  );
};

function StyledTable({
  labels,
  bodyRows,
  title,
  leftItem,
  leftSubItem,
  rightItem,
  minWidth,
  setPage,
  totalPages,
  currentPage,
  emptyState,
  isTableLoading,
  tableLoadingCount,
  headingPadding,
  onRowClick,
  showShadow = true,
  hasCheckBoxAction = false,
  hasNoSelectAll = false,
  selectedRows = [],
  setSelectedRows = () => {},
  collapsible = false,
  maxWidth,
  onView,
  onEdit,
  onDelete,
  actionLabel,
  subActions,
  showHeading = true,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  const handleSelectAll = (event) => {
    event.stopPropagation();
    if (selectedRows.length === bodyRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...bodyRows]);
    }
  };

  const handleRowSelect = (event, row) => {
    event.stopPropagation();
    if (selectedRows.includes(row)) {
      setSelectedRows((prev) => prev.filter((item) => item !== row));
    } else {
      setSelectedRows((prev) => [...prev, row]);
    }
  };

  const toggleDropDown = (rowData) => {
    setDropDown((prev) => (prev === rowData ? false : rowData));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={`bg-white rounded-[10px] scale-100 ${
          showShadow ? "shadow-[0px_4px_12px_rgba(0.05,0.05,0.05,0.05)]" : ""
        }`}
      >
        <div
          className={`${
            showHeading ? "flex" : "hidden"
          } justify-between p-4 gap-2 rounded-[10px]`}
          style={{ padding: headingPadding }}
        >
          <div className="flex flex-row justify-between items-center w-full">
            {leftItem
              ? leftItem
              : title && (
                  <div className="flex items-center gap-4">
                    {collapsible && (
                      <span
                        className="cursor-pointer flex items-center"
                        onClick={toggleCollapse}
                      >
                        {isCollapsed ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronUp size={16} />
                        )}
                      </span>
                    )}
                    <h1 className="text-lg text-gray-900 font-semibold mt-2">
                      {title}
                    </h1>
                    {leftSubItem}
                  </div>
                )}
            {rightItem}
          </div>
        </div>
        {!isCollapsed && (
          <>
            <Divider />
            <OverflowWrapper minWidth={minWidth}>
              <table
                className={`w-full ${hasCheckBoxAction ? "pl-10" : ""}`}
                style={{ maxWidth }}
              >
                <thead className="bg-gray-100 text-sm text-gray-500 border-t border-b border-gray-200">
                  <tr className="relative">
                    {hasCheckBoxAction && !hasNoSelectAll && (
                      <CustomCheckBox
                        checked={
                          bodyRows?.length === selectedRows?.length &&
                          selectedRows?.length !== 0
                        }
                        onClick={handleSelectAll}
                      />
                    )}

                    {labels?.map((label, index) => (
                      <th
                        key={index}
                        className="p-4 font-semibold"
                        style={{
                          paddingLeft: hasCheckBoxAction ? "2.5rem" : "1rem",
                        }}
                      >
                        {label}
                      </th>
                    ))}

                    {(onDelete ||
                      onEdit ||
                      onView ||
                      subActions?.length > 0) && (
                      <th>{actionLabel ? actionLabel : ""}</th>
                    )}
                  </tr>
                </thead>
                {!isTableLoading && bodyRows && (
                  <tbody className="border-b border-gray-200">
                    {bodyRows?.map((row, index) => (
                      <tr
                        key={index}
                        onClick={() => onRowClick && onRowClick(row)}
                        className={`transition-colors duration-300 hover:bg-gray-50 ${
                          onRowClick ? "cursor-pointer" : "cursor-default"
                        } relative`}
                      >
                        {hasCheckBoxAction && (
                          <CustomCheckBox
                            checked={selectedRows.includes(row)}
                            onClick={(e) => handleRowSelect(e, row)}
                          />
                        )}

                        {Object.keys(row).map((key, i) =>
                          (onRowClick && key === "onRowClickData") ||
                          key.startsWith("hide") ? null : (
                            <td
                              key={i}
                              className="p-4 text-sm align-middle"
                              style={{
                                paddingLeft: hasCheckBoxAction
                                  ? "2.5rem"
                                  : "1rem",
                                maxWidth: maxWidth || "none",
                              }}
                            >
                              {row[key]}
                            </td>
                          )
                        )}

                        {(onView ||
                          onEdit ||
                          onDelete ||
                          subActions?.length > 0) && (
                          <td>
                            <div className="flex items-center gap-5">
                              {subActions && (
                                <div>
                                  <MoreVertical
                                    size={15}
                                    color="#667085"
                                    className="cursor-pointer"
                                    onClick={() =>
                                      toggleDropDown(row.onRowClickData)
                                    }
                                  />
                                  {dropDown === row.onRowClickData && (
                                    <HandleClickEvent
                                      show={true}
                                      onClickOutside={() => setDropDown(false)}
                                    >
                                      <DropDown
                                        right="0"
                                        position="fixed"
                                        items={subActions[index]}
                                      />
                                    </HandleClickEvent>
                                  )}
                                </div>
                              )}
                              {onDelete && (
                                <button
                                  onClick={() => onDelete(row?.onRowClickData)}
                                  className="bg-inherit"
                                >
                                  <Trash2 size={14} color="#667085" />
                                </button>
                              )}
                              {onEdit && (
                                <button
                                  onClick={() => {
                                    onEdit(row?.onRowClickData);
                                  }}
                                  className="bg-inherit"
                                >
                                  <Edit2 size={13} color="#667085" />
                                </button>
                              )}
                              {onView && (
                                <button
                                  onClick={() => {
                                    onView(row?.onRowClickData);
                                  }}
                                  className="bg-inherit"
                                >
                                  <Eye size={15} color="#667085" />
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </OverflowWrapper>
            {!isTableLoading && bodyRows?.length === 0 && (
              <div className="flex justify-center items-center mt-6">
                <EmptyState
                  title={emptyState?.title || "No Data Found"}
                  description={
                    emptyState?.description || "There is no data to display"
                  }
                  buttonText={emptyState?.buttonText}
                  buttonIcon={emptyState?.buttonIcon}
                  onClick={emptyState?.onclick}
                  loading={emptyState?.loading}
                  iconImage={
                    <ResponsiveImage
                      height={emptyState?.imageHeight || "100px"}
                      width={emptyState?.imageWidth || "210px"}
                      src={
                        emptyState?.imageSrc || "/emptyStateAvatar/feedback.svg"
                      }
                    />
                  }
                />
              </div>
            )}
            {isTableLoading && (
              <ResponsiveTableLoader count={tableLoadingCount || 5} />
            )}
          </>
        )}
      </div>
      {setPage &&
        totalPages !== undefined &&
        currentPage &&
        !isTableLoading && (
          <Pagination
            setPage={setPage}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        )}
    </div>
  );
}

StyledTable.propTypes = {
  labels: Proptypes.array.isRequired,
  bodyRows: Proptypes.array.isRequired,
  setPage: Proptypes.func,
  totalPages: Proptypes.number,
  title: Proptypes.string,
  count: Proptypes.number,
  leftItem: Proptypes.node,
  rightItem: Proptypes.node,
  minWidth: Proptypes.string,
  currentPage: Proptypes.number,
  isTableLoading: Proptypes.bool,
  tableLoadingCount: Proptypes.number,
  headingPadding: Proptypes.string,
  onRowClick: Proptypes.func,
  emptyState: Proptypes.shape({
    title: Proptypes.string,
    description: Proptypes.string,
    imageSrc: Proptypes.any,
    buttonText: Proptypes.string,
    onclick: Proptypes.func,
    imageWidth: Proptypes.string,
    imageHeight: Proptypes.string,
    loading: Proptypes.bool,
  }),
  selectedRows: Proptypes.object,
  setSelectedRows: Proptypes.func,
};

export default StyledTable;
