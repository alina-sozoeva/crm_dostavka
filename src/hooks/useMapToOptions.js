import { useMemo } from "react";

export const useMapToOptions = (data, labelKey, extraFields = []) => {
  return useMemo(() => {
    if (!data) return [];

    return data.map((item) => {
      const option = {
        value: item.codeid,
        label: item[labelKey] || "",
      };

      extraFields.forEach((field) => {
        if (item[field] !== undefined) {
          option[field] = item[field];
        }
      });

      return option;
    });
  }, [data, labelKey, extraFields.join()]);
};
