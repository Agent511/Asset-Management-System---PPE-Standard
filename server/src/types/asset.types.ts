// src/types/asset.types.ts
export interface AssetRegistrationData {
  // Core Fields
  assetName: string;
  assetDescription?: string;
  category: string;
  subcategory: string;
  status: string;
  brand?: string;
  department: string;
  
  // IT Equipment Fields
  modelNumber?: string;
  serialNumber?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  operatingSystem?: string;
  monitorSize?: string;
  connectivity?: string;
  warrantyExpiry?: string;
  
  // Vehicle Fields
  registrationNumber?: string;
  make?: string;
  model?: string;
  manufacturingYear?: string;
  engineNumber?: string;
  vinNumber?: string;
  fuelType?: string;
  engineCapacity?: string;
  transmission?: string;
  seatingCapacity?: string;
  insurancePolicyNumber?: string;
  insuranceExpiry?: string;
  registrationExpiry?: string;

  // Machinery Fields
  machineryType?: string;
  powerRating?: string;
  voltage?: string;
  phase?: string;
  weight?: string;
  dimensions?: string;
  operatingTemperature?: string;
  safetyCertification?: string;
  lastInspection?: string;
  nextInspection?: string;

  // Furniture Fields
  material?: string;
  color?: string;
  dimensionsFurniture?: string;
  weightCapacity?: string;
  assemblyRequired?: string;
  warrantyPeriod?: string;

  // Building Fields
  buildingType?: string;
  floorArea?: string;
  numberOfFloors?: string;
  constructionYear?: string;
  buildingMaterial?: string;
  occupancyType?: string;
  utilities?: string;
  parkingAvailable?: string;
  securityFeatures?: string;

  // Land Fields
  landArea?: string;
  landUse?: string;
  zoning?: string;
  soilType?: string;
  topography?: string;
  utilitiesAvailable?: string;
  accessibility?: string;

  // Office Equipment Fields
  equipmentType?: string;
  powerConsumption?: string;
  connectivityOffice?: string;
  paperCapacity?: string;
  printSpeed?: string;
  functions?: string;
}