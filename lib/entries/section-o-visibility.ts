export type SectionOVisibility = {
  endInterview: boolean;
  otherBuilding: boolean;
  showO01Specify: boolean;
  showBuildingDetails: boolean;
  showTenureBlock: boolean;
  showUtilitiesBlock: boolean;
  showConveniences: boolean;
};

export function getSectionOVisibility(o01: string): SectionOVisibility {
  const endInterview = o01 === "08" || o01 === "10";
  const otherBuilding = o01 === "09";
  const standard = Boolean(o01) && !endInterview && !otherBuilding;

  return {
    endInterview,
    otherBuilding,
    showO01Specify: o01 === "09",
    showBuildingDetails: standard,
    showTenureBlock: standard,
    showUtilitiesBlock: !endInterview && (standard || otherBuilding),
    showConveniences: !endInterview && (standard || otherBuilding),
  };
}
