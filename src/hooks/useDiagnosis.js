import { useState, useCallback } from "react";
import { calcCF } from "../engine/calcCF";

/**
 * Custom hook untuk diagnosis engine
 * Manage state dan logika diagnosis
 */
export function useDiagnosis() {
  const [selected, setSelected] = useState({});
  const [results, setResults] = useState([]);
  const [customer, setCustomer] = useState({ name: "", phone: "" });

  const toggle = useCallback((id) => {
    setSelected((prev) => {
      if (id in prev) {
        const newSelected = { ...prev };
        delete newSelected[id];
        return newSelected;
      }
      return { ...prev, [id]: 0.6 };
    });
  }, []);

  const setConfidence = useCallback((id, value) => {
    setSelected((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const analyze = useCallback(() => {
    const diagnosisResults = calcCF(selected);
    setResults(diagnosisResults);
    return diagnosisResults;
  }, [selected]);

  const reset = useCallback(() => {
    setSelected({});
    setResults([]);
    setCustomer({ name: "", phone: "" });
  }, []);

  const updateCustomer = useCallback((field, value) => {
    setCustomer((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  return {
    selected,
    results,
    customer,
    toggle,
    setConfidence,
    analyze,
    reset,
    updateCustomer,
    symptomsCount: Object.keys(selected).length,
  };
}
