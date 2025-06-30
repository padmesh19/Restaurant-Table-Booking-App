// StateDistrictSelector.jsx
import { useMemo, useState } from "react";
import { State, City } from "country-state-city";
import { Select } from "../Select"; // adjust path if needed

export default function StateDistrictSelector({ onChange, isLarge = false }) {
  // All states as dropdown options
  const stateOptions = useMemo(
    () =>
      State.getStatesOfCountry("IN").map((s) => ({
        label: s.name,
        value: s.isoCode, // we'll use this to fetch districts
        name: s.name, // keeping for display
      })),
    []
  );

  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // District options based on selected state
  const districtOptions = useMemo(() => {
    if (!selectedState) return [];

    return City.getCitiesOfState("IN", selectedState.value).map((city) => ({
      label: city.name,
      value: city.name,
    }));
  }, [selectedState]);

  const handleStateChange = (stateOption) => {
    setSelectedState(stateOption);
    setSelectedDistrict(null);
    onChange?.({ state: stateOption?.label || null, district: null });
  };

  const handleDistrictChange = (districtOption) => {
    setSelectedDistrict(districtOption);
    onChange?.({
      state: selectedState?.label || null,
      district: districtOption?.label || null,
    });
  };

  return (
    <div className="d-flex flex-column gap-3 w-100">
      {/* ---- State ---- */}
      <Select
        id="state-select"
        label="State"
        placeholder="Select State"
        options={stateOptions}
        value={selectedState}
        onChange={handleStateChange}
        isLarge={isLarge}
        menuWidth="100%"
      />

      {/* ---- District ---- */}
      <Select
        id="district-select"
        label="District"
        placeholder={selectedState ? "Select District" : "Choose a state first"}
        options={districtOptions}
        value={selectedDistrict}
        onChange={handleDistrictChange}
        isDisabled={!selectedState}
        isLarge={isLarge}
        menuWidth="100%"
        hasError={!!selectedState && !selectedDistrict}
        errorMessage={
          !!selectedState && !selectedDistrict ? "Please pick a district" : null
        }
      />
    </div>
  );
}
