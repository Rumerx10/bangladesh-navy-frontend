"use client";

import DeleteConfirmDialog from "@/src/components/shared/DeleteConfirmDialog";
import { useDelete } from "@/src/hooks/useDelete";
import { useGet } from "@/src/hooks/useGet";
import { usePatch } from "@/src/hooks/usePatch";
import { Check, Edit3, MapPin, Phone, Plus, Trash2, User } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import CreateUpdateAddress from "../Form/CreateUpdateAddress";
import AddressListSkeleton from "../Skeleton/AddressListSkeleton";
import { ADDRESSES_QUERY_KEY, IAddress, MAX_SAVED_ADDRESSES } from "../types";

const AddressList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IAddress | undefined>();
  const [pendingDelete, setPendingDelete] = useState<IAddress | null>(null);

  const { data, isLoading } = useGet<IAddress[]>(
    "/address",
    ADDRESSES_QUERY_KEY
  );
  const addresses = Array.isArray(data?.data) ? data.data : [];
  const isFull = addresses.length >= MAX_SAVED_ADDRESSES;

  const { mutate: deleteMutate } = useDelete(() => {
    toast.success("Address deleted");
    setPendingDelete(null);
  }, [ADDRESSES_QUERY_KEY]);

  const { mutate: setDefaultMutate } = usePatch(() => {
    toast.success("Default address updated");
  }, [ADDRESSES_QUERY_KEY]);

  const openCreate = () => {
    setSelectedItem(undefined);
    setIsModalOpen(true);
  };

  const openEdit = (item: IAddress) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 rounded-xl bg-light p-5">
      <div className="flex items-center justify-between gap-4 rounded-xl bg-primary/10 p-3">
        <div>
          <h1 className="text-xl font-bold text-foreground lg:text-2xl">
            Address Book
          </h1>
          <p className="mt-1 text-sm text-secondary-foreground">
            {isFull
              ? `You've saved the most addresses allowed (${MAX_SAVED_ADDRESSES}). Delete one to add another.`
              : "Addresses you save here can be picked at checkout."}
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          disabled={isFull}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add address</span>
        </button>
      </div>

      {isLoading ? (
        <AddressListSkeleton />
      ) : addresses.length === 0 ? (
        <div className="flex min-h-68 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card p-6 text-center">
          <MapPin size={28} className="text-muted-foreground" />
          <p className="text-sm text-secondary-foreground">
            No saved addresses yet. Add one to check out faster.
          </p>
          <button
            type="button"
            onClick={openCreate}
            className="cursor-pointer text-sm font-semibold text-primary hover:underline"
          >
            Add your first address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`relative rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md ${
                addr.isDefault
                  ? "border-primary/30 ring-1 ring-primary/10"
                  : "border-border"
              }`}
            >
              {(addr.label || addr.isDefault) && (
                <div className="mb-3 flex items-center gap-2">
                  {addr.label && (
                    <span className="rounded-md bg-light-dark px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                      {addr.label}
                    </span>
                  )}
                  {addr.isDefault && (
                    <span className="flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      <Check size={12} />
                      Default
                    </span>
                  )}
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <User size={14} className="shrink-0 text-muted-foreground" />
                  {addr.fullName}
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary-foreground">
                  <Phone size={14} className="shrink-0 text-muted-foreground" />
                  {addr.phone}
                </div>
                <div className="flex items-start gap-2 text-sm text-secondary-foreground">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-muted-foreground"
                  />
                  <span>
                    {addr.address}
                    <br />
                    {addr.city}
                    {addr.postcode ? ` ${addr.postcode}` : ""}, {addr.country}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                <button
                  type="button"
                  onClick={() => openEdit(addr)}
                  className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:text-primary"
                >
                  <Edit3 size={13} />
                  Edit
                </button>
                {!addr.isDefault && (
                  <>
                    <span className="text-light-silver">|</span>
                    <button
                      type="button"
                      onClick={() =>
                        setDefaultMutate({
                          url: `/address/${addr.id}/default`,
                          data: {},
                        })
                      }
                      className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-700"
                    >
                      <Check size={13} />
                      Make default
                    </button>
                  </>
                )}
                <span className="text-light-silver">|</span>
                <button
                  type="button"
                  onClick={() => setPendingDelete(addr)}
                  className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-red-500 transition-colors hover:text-red-600"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateUpdateAddress
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(undefined);
        }}
        initialValues={selectedItem}
      />

      <DeleteConfirmDialog
        isOpen={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={() =>
          pendingDelete && deleteMutate({ url: `/address/${pendingDelete.id}` })
        }
        title="Delete this address?"
        description={
          pendingDelete?.isDefault
            ? "This is your default address. Your newest remaining address becomes the default. Orders already placed keep their copy."
            : "Orders already placed keep their copy of this address."
        }
      />
    </div>
  );
};

export default AddressList;
