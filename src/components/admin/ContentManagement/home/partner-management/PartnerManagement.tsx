"use client";

import { useEffect, useState } from "react";
import { useGet } from "@/src/hooks/useGet";
import { usePagination } from "@/src/hooks/usePagination";
import { useSearchDebounce } from "@/src/hooks/useSearchDebounce";
import { DataTable } from "@/src/components/ui/data-table";
import { IPartner } from "./types";
import { GetPartnerColumns } from "./TableColumns/PartnerColumns";
import { getPartnerViewSections } from "./TableColumns/PartnerViewFields";
import ViewDetailsModal from "@/src/components/shared/ViewDetailsModal/ViewDetailsModal";
import CreateUpdatePartner from "./Form/CreateUpdatePartner";

const PartnerManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewItem, setViewItem] = useState<IPartner | null>(null);
  const [selectedItem, setSelectedItem] = useState<IPartner | undefined>();

  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
    setItemsPerPage,
  } = usePagination();

  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(300);

  const { data, isLoading } = useGet<IPartner[]>(
    "/partners",
    [
      "partners",
      currentPage.toString(),
      itemsPerPage.toString(),
      debouncedSearch,
    ],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
      search: debouncedSearch,
    }
  );

  useEffect(() => {
    if (data) setTotalItems(data.meta?.totalItems || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleEdit = (item: IPartner) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(undefined);
  };

  const columns = GetPartnerColumns(handleEdit, setViewItem);

  return (
    <>
      <DataTable
        columns={columns}
        data={Array.isArray(data?.data) ? data.data : []}
        isLoading={isLoading}
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        title="Partners"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search partners..."
        isShowStatus={false}
        IsCreate
        setIsModalOpen={setIsModalOpen}
        createTitle="Add Partner"
      />
      <CreateUpdatePartner
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialValues={selectedItem}
      />
      <ViewDetailsModal
        isOpen={viewItem !== null}
        onClose={() => setViewItem(null)}
        title="Partner Details"
        sections={viewItem ? getPartnerViewSections(viewItem) : []}
      />
    </>
  );
};

export default PartnerManagement;
