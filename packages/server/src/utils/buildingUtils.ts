export const isResourceField = (fieldId: number): boolean =>
  fieldId >= 1 && fieldId <= 18;

export const isInfrastructure = (fieldId: number): boolean =>
  fieldId >= 19 && fieldId <= 40;
