import Select from "@/components/Select";
import { filterOptions } from "../configs";

export type FilterProps = {
  status: string | null;
  setStatus: (value: string | null) => void;
};

export default function Filter({ status, setStatus }: FilterProps) {
  return (
    <Select
      label="Status"
      value={status}
      onChange={setStatus}
      data={filterOptions}
    />
  );
}
