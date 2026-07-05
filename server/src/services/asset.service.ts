// src/services/asset.service.ts
import { pool } from '../config/database.js';
import { AssetRegistrationData } from '../types/asset.types.js';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import crypto from 'crypto';

export class AssetService {
  // Generate asset code based on category
  private async generateAssetCode(categoryName: string): Promise<string> {
    const categoryPrefixes: { [key: string]: string } = {
      'IT Equipment': 'IT_EQ',
      'Machinery': 'MCH',
      'Furniture': 'FUR',
      'Vehicle': 'VEH',
      'Building': 'BLD',
      'Land': 'LND',
      'Office Equipment': 'OFF_EQ'
    };

    const prefix = categoryPrefixes[categoryName] || 'AST';
    
    const query = `
      SELECT COUNT(*) as count 
      FROM assets 
      WHERE asset_code LIKE $1
    `;
    const result = await pool.query(query, [`${prefix}_%`]);
    const count = parseInt(result.rows[0].count) + 1;
    const paddedNumber = String(count).padStart(5, '0');
    
    return `${prefix}_${paddedNumber}`;
  }

  // Generate unique QR code with optimized data (reduced size)
  private async generateUniqueQRCode(
    assetId: string, 
    assetCode: string, 
    assetName: string, 
    category: string,
    brand?: string,
    model?: string,
    serial?: string,
    description?: string,
    subcategory?: string,
    status?: string,
    categoryDetails?: any
  ): Promise<string> {
    
    // Build concise formatted text - only essential info
    const lines = [
      '═══════════════════════════',
      '     ASSET DETAILS        ',
      '═══════════════════════════',
      `ID:  ${assetCode}`,
      `Name: ${assetName.substring(0, 30)}`,
      `Cat: ${category}`,
    ];
    
    if (subcategory) lines.push(`Sub: ${subcategory.substring(0, 20)}`);
    if (brand) lines.push(`Brand: ${brand.substring(0, 20)}`);
    if (model) lines.push(`Model: ${model.substring(0, 20)}`);
    if (serial) lines.push(`SN: ${serial.substring(0, 15)}`);
    if (status) lines.push(`Status: ${status}`);
    
    // Short description (max 40 chars)
    if (description) {
      const shortDesc = description.length > 35 ? description.substring(0, 32) + '...' : description;
      lines.push(`Desc: ${shortDesc}`);
    }
    
    // Add ONLY the most important category-specific details (max 4-5 fields)
    if (categoryDetails) {
      lines.push('─────────────────────');
      
      // IT Equipment - show only key specs
      if (category === 'IT Equipment') {
        if (categoryDetails.asset_type) lines.push(`Type: ${categoryDetails.asset_type}`);
        const specs = [];
        if (categoryDetails.processor) specs.push(categoryDetails.processor.split(',')[0]);
        if (categoryDetails.ram) specs.push(categoryDetails.ram);
        if (categoryDetails.storage) specs.push(categoryDetails.storage.split(',')[0]);
        if (specs.length > 0) lines.push(`Specs: ${specs.join(', ')}`);
        if (categoryDetails.warranty_expiry_date) {
          const date = new Date(categoryDetails.warranty_expiry_date).toLocaleDateString();
          lines.push(`Warranty: ${date}`);
        }
      }
      
      // Vehicle - show only essential info
      else if (category === 'Vehicle') {
        if (categoryDetails.registration_number) lines.push(`Reg: ${categoryDetails.registration_number}`);
        if (categoryDetails.make) lines.push(`Make: ${categoryDetails.make}`);
        if (categoryDetails.model) lines.push(`Model: ${categoryDetails.model}`);
        if (categoryDetails.manufacturing_year) lines.push(`Year: ${categoryDetails.manufacturing_year}`);
        if (categoryDetails.fuel_type) lines.push(`Fuel: ${categoryDetails.fuel_type}`);
        if (categoryDetails.insurance_expiry_date) {
          const date = new Date(categoryDetails.insurance_expiry_date).toLocaleDateString();
          lines.push(`Ins Exp: ${date}`);
        }
      }
      
      // Machinery - show only essential info
      else if (category === 'Machinery') {
        if (categoryDetails.machinery_type) lines.push(`Type: ${categoryDetails.machinery_type}`);
        if (categoryDetails.power_rating) lines.push(`Power: ${categoryDetails.power_rating}`);
        if (categoryDetails.voltage) lines.push(`Voltage: ${categoryDetails.voltage}`);
        if (categoryDetails.weight) lines.push(`Weight: ${categoryDetails.weight}kg`);
        if (categoryDetails.next_inspection_date) {
          const date = new Date(categoryDetails.next_inspection_date).toLocaleDateString();
          lines.push(`Next Insp: ${date}`);
        }
      }
      
      // Furniture - show only essential info
      else if (category === 'Furniture') {
        if (categoryDetails.material) lines.push(`Material: ${categoryDetails.material}`);
        if (categoryDetails.color) lines.push(`Color: ${categoryDetails.color}`);
        if (categoryDetails.dimensions) lines.push(`Dims: ${categoryDetails.dimensions}`);
        if (categoryDetails.weight_capacity) lines.push(`Weight Cap: ${categoryDetails.weight_capacity}kg`);
        if (categoryDetails.warranty_period) lines.push(`Warranty: ${categoryDetails.warranty_period}`);
      }
      
      // Building - show only essential info
      else if (category === 'Building') {
        if (categoryDetails.building_type) lines.push(`Type: ${categoryDetails.building_type}`);
        if (categoryDetails.floor_area) lines.push(`Area: ${categoryDetails.floor_area}sqft`);
        if (categoryDetails.number_of_floors) lines.push(`Floors: ${categoryDetails.number_of_floors}`);
        if (categoryDetails.construction_year) lines.push(`Year: ${categoryDetails.construction_year}`);
        if (categoryDetails.occupancy_type) lines.push(`Occ: ${categoryDetails.occupancy_type}`);
      }
      
      // Land - show only essential info
      else if (category === 'Land') {
        if (categoryDetails.land_area) lines.push(`Area: ${categoryDetails.land_area}acres`);
        if (categoryDetails.land_use) lines.push(`Use: ${categoryDetails.land_use}`);
        if (categoryDetails.zoning) lines.push(`Zoning: ${categoryDetails.zoning}`);
        if (categoryDetails.soil_type) lines.push(`Soil: ${categoryDetails.soil_type}`);
      }
      
      // Office Equipment - show only essential info
      else if (category === 'Office Equipment') {
        if (categoryDetails.equipment_type) lines.push(`Type: ${categoryDetails.equipment_type}`);
        if (categoryDetails.power_consumption) lines.push(`Power: ${categoryDetails.power_consumption}W`);
        if (categoryDetails.print_speed) lines.push(`Speed: ${categoryDetails.print_speed}ppm`);
        if (categoryDetails.functions) {
          const funcs = categoryDetails.functions.split(',').slice(0, 3).join(',');
          lines.push(`Funcs: ${funcs}`);
        }
      }
    }
    
    // Footer
    lines.push('─────────────────────');
    lines.push(`Scan: ${new Date().toLocaleDateString()}`);
    lines.push('═══════════════════════════');
    
    const qrText = lines.join('\n');
    
    // Generate QR code with embedded text
    const qrCode = await QRCode.toDataURL(qrText, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 300,
      color: {
        dark: '#1E3A8A',
        light: '#FFFFFF'
      }
    });
    
    return qrCode;
  }

  // Get category ID by name
  private async getCategoryId(categoryName: string): Promise<string> {
    const query = `SELECT id FROM asset_categories WHERE name = $1`;
    const result = await pool.query(query, [categoryName]);
    if (result.rows.length === 0) {
      throw new Error(`Category "${categoryName}" not found. Please ensure the category exists in the database.`);
    }
    return result.rows[0].id;
  }

  // Get subcategory ID by name
  private async getSubcategoryId(categoryId: string, subcategoryName: string): Promise<string | null> {
    if (!subcategoryName) return null;
    const query = `SELECT id FROM asset_subcategories WHERE category_id = $1 AND name = $2`;
    const result = await pool.query(query, [categoryId, subcategoryName]);
    return result.rows.length > 0 ? result.rows[0].id : null;
  }

  // Get status ID by name
  private async getStatusId(statusName: string): Promise<string> {
    const query = `SELECT id FROM asset_statuses WHERE name = $1`;
    const result = await pool.query(query, [statusName]);
    if (result.rows.length === 0) {
      throw new Error(`Status "${statusName}" not found. Please ensure the status exists in the database.`);
    }
    return result.rows[0].id;
  }

  // Main registration method
  async registerAsset(data: AssetRegistrationData): Promise<any> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Get IDs
      const categoryId = await this.getCategoryId(data.category);
      const statusId = await this.getStatusId(data.status);
      const subcategoryId = data.subcategory ? await this.getSubcategoryId(categoryId, data.subcategory) : null;
      const assetCode = await this.generateAssetCode(data.category);
      
      // Generate unique QR code with optimized data
      const assetId = uuidv4();
      
      // Prepare category details (only essential fields)
      let categoryDetails = {};
      
      if (data.category === 'IT Equipment') {
        categoryDetails = {
          asset_type: data.assetType,
          processor: data.processor,
          ram: data.ram,
          storage: data.storage,
          warranty_expiry_date: data.warrantyExpiry
        };
      } else if (data.category === 'Vehicle') {
        categoryDetails = {
          registration_number: data.registrationNumber,
          make: data.make,
          model: data.model,
          manufacturing_year: data.manufacturingYear,
          fuel_type: data.fuelType,
          insurance_expiry_date: data.insuranceExpiry
        };
      } else if (data.category === 'Machinery') {
        categoryDetails = {
          machinery_type: data.machineryType,
          power_rating: data.powerRating,
          voltage: data.voltage,
          weight: data.weight,
          next_inspection_date: data.nextInspection
        };
      } else if (data.category === 'Furniture') {
        categoryDetails = {
          material: data.material,
          color: data.color,
          dimensions: data.dimensionsFurniture,
          weight_capacity: data.weightCapacity,
          warranty_period: data.warrantyPeriod
        };
      } else if (data.category === 'Building') {
        categoryDetails = {
          building_type: data.buildingType,
          floor_area: data.floorArea,
          number_of_floors: data.numberOfFloors,
          construction_year: data.constructionYear,
          occupancy_type: data.occupancyType
        };
      } else if (data.category === 'Land') {
        categoryDetails = {
          land_area: data.landArea,
          land_use: data.landUse,
          zoning: data.zoning,
          soil_type: data.soilType
        };
      } else if (data.category === 'Office Equipment') {
        categoryDetails = {
          equipment_type: data.equipmentType,
          power_consumption: data.powerConsumption,
          print_speed: data.printSpeed,
          functions: data.functions
        };
      }
      
      const qrCode = await this.generateUniqueQRCode(
        assetId, 
        assetCode, 
        data.assetName, 
        data.category,
        data.brand,
        data.modelNumber,
        data.serialNumber,
        data.assetDescription,
        data.subcategory,
        data.status,
        categoryDetails
      );
      
      console.log('Category ID:', categoryId);
      console.log('Status ID:', statusId);
      console.log('Subcategory ID:', subcategoryId);
      console.log('Asset Code:', assetCode);
      
      // Insert main asset with QR code
      const assetQuery = `
        INSERT INTO assets (
          id, asset_code, asset_name, asset_description,
          category_id, subcategory_id, status_id,
          acquisition_date, acquisition_cost,
          qr_code, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          CURRENT_DATE, 0,
          $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        ) RETURNING id, asset_code
      `;
      
      const assetValues = [
        assetId,
        assetCode,
        data.assetName,
        data.assetDescription || null,
        categoryId,
        subcategoryId,
        statusId,
        qrCode
      ];
      
      const assetResult = await client.query(assetQuery, assetValues);
      const insertedAssetId = assetResult.rows[0].id;
      
      // Insert category-specific details
      await this.insertCategoryDetails(client, insertedAssetId, data);
      
      await client.query('COMMIT');
      
      return {
        success: true,
        message: 'Asset registered successfully',
        data: {
          id: insertedAssetId,
          assetCode: assetResult.rows[0].asset_code,
          qrCode: qrCode
        }
      };
      
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error registering asset:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Insert category-specific details
  private async insertCategoryDetails(client: any, assetId: string, data: AssetRegistrationData): Promise<void> {
    const category = data.category;
    
    // IT Equipment
    if (category === 'IT Equipment') {
      const query = `
        INSERT INTO it_equipment_details (
          id, asset_id, model_number, asset_type,
          processor, operating_system,
          monitor_size, connectivity, warranty_expiry_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `;
      await client.query(query, [
        uuidv4(),
        assetId,
        data.modelNumber || null,
        data.serialNumber || null,
        data.assetType || null,
        data.processor || null,
        data.ram || null,
        data.storage || null,
        data.operatingSystem || null,
        data.monitorSize || null,
        data.connectivity || null,
        data.warrantyExpiry || null
      ]);
    }
    
    // Vehicle
    else if (category === 'Vehicle') {
      const query = `
        INSERT INTO vehicle_details (
          id, asset_id, registration_number, make, model,
          manufacturing_year, engine_number, vin_number, fuel_type,
          engine_capacity, transmission, seating_capacity,
          insurance_policy_number, insurance_expiry_date, registration_expiry_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      `;
      await client.query(query, [
        uuidv4(),
        assetId,
        data.registrationNumber || null,
        data.make || null,
        data.model || null,
        data.manufacturingYear ? parseInt(data.manufacturingYear) : null,
        data.engineNumber || null,
        data.vinNumber || null,
        data.fuelType || null,
        data.engineCapacity || null,
        data.transmission || null,
        data.seatingCapacity || null,
        data.insurancePolicyNumber || null,
        data.insuranceExpiry || null,
        data.registrationExpiry || null
      ]);
    }
    
    // Machinery
    else if (category === 'Machinery') {
      const query = `
        INSERT INTO machinery_details (
          id, asset_id, machinery_type, power_rating, voltage,
          phase, weight, dimensions, operating_temperature,
          safety_certification, last_inspection_date, next_inspection_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `;
      await client.query(query, [
        uuidv4(),
        assetId,
        data.machineryType || null,
        data.powerRating || null,
        data.voltage || null,
        data.phase || null,
        data.weight ? parseFloat(data.weight) : null,
        data.dimensions || null,
        data.operatingTemperature || null,
        data.safetyCertification || null,
        data.lastInspection || null,
        data.nextInspection || null
      ]);
    }
    
    // Furniture
    else if (category === 'Furniture') {
      const query = `
        INSERT INTO furniture_details (
          id, asset_id, material, color, dimensions,
          weight_capacity, assembly_required, warranty_period
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      await client.query(query, [
        uuidv4(),
        assetId,
        data.material || null,
        data.color || null,
        data.dimensionsFurniture || null,
        data.weightCapacity ? parseFloat(data.weightCapacity) : null,
        data.assemblyRequired === 'Yes' ? true : false,
        data.warrantyPeriod || null
      ]);
    }
    
    // Building
    else if (category === 'Building') {
      const query = `
        INSERT INTO building_details (
          id, asset_id, building_type, floor_area, number_of_floors,
          construction_year, building_material, occupancy_type,
          utilities, parking_available, security_features
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `;
      await client.query(query, [
        uuidv4(),
        assetId,
        data.buildingType || null,
        data.floorArea || null,
        data.numberOfFloors ? parseInt(data.numberOfFloors) : null,
        data.constructionYear ? parseInt(data.constructionYear) : null,
        data.buildingMaterial || null,
        data.occupancyType || null,
        data.utilities || null,
        data.parkingAvailable === 'Yes' ? true : false,
        data.securityFeatures || null
      ]);
    }
    
    // Land
    else if (category === 'Land') {
      const query = `
        INSERT INTO land_details (
          id, asset_id, land_area, land_use, zoning,
          soil_type, topography, utilities_available, accessibility
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      await client.query(query, [
        uuidv4(),
        assetId,
        data.landArea || null,
        data.landUse || null,
        data.zoning || null,
        data.soilType || null,
        data.topography || null,
        data.utilitiesAvailable || null,
        data.accessibility || null
      ]);
    }
    
    // Office Equipment
    else if (category === 'Office Equipment') {
      const query = `
        INSERT INTO office_equipment_details (
          id, asset_id, equipment_type, power_consumption,
          connectivity, paper_capacity, print_speed, functions
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      await client.query(query, [
        uuidv4(),
        assetId,
        data.equipmentType || null,
        data.powerConsumption || null,
        data.connectivityOffice || null,
        data.paperCapacity || null,
        data.printSpeed || null,
        data.functions || null
      ]);
    }
  }

  // Get all assets
  async getAllAssets() {
    const query = `
      SELECT 
        a.id,
        a.asset_code,
        a.asset_name,
        a.asset_description,
        ac.name as category_name,
        acs.name as subcategory_name,
        ast.name as status_name,
        a.qr_code,
        a.created_at,
        a.updated_at,
        -- Get category-specific details as JSON
        CASE 
          WHEN ac.name = 'IT Equipment' THEN (
            SELECT row_to_json(it)
            FROM it_equipment_details it
            WHERE it.asset_id = a.id
          )
          WHEN ac.name = 'Vehicle' THEN (
            SELECT row_to_json(v)
            FROM vehicle_details v
            WHERE v.asset_id = a.id
          )
          WHEN ac.name = 'Machinery' THEN (
            SELECT row_to_json(m)
            FROM machinery_details m
            WHERE m.asset_id = a.id
          )
          WHEN ac.name = 'Furniture' THEN (
            SELECT row_to_json(f)
            FROM furniture_details f
            WHERE f.asset_id = a.id
          )
          WHEN ac.name = 'Building' THEN (
            SELECT row_to_json(b)
            FROM building_details b
            WHERE b.asset_id = a.id
          )
          WHEN ac.name = 'Land' THEN (
            SELECT row_to_json(l)
            FROM land_details l
            WHERE l.asset_id = a.id
          )
          WHEN ac.name = 'Office Equipment' THEN (
            SELECT row_to_json(o)
            FROM office_equipment_details o
            WHERE o.asset_id = a.id
          )
        END as details
      FROM assets a
      LEFT JOIN asset_categories ac ON a.category_id = ac.id
      LEFT JOIN asset_statuses ast ON a.status_id = ast.id
      LEFT JOIN asset_subcategories acs ON a.subcategory_id = acs.id
      WHERE a.is_active = true
      ORDER BY a.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Get asset by ID
  async getAssetById(id: string) {
    const query = `
      SELECT 
        a.id,
        a.asset_code,
        a.asset_name,
        a.asset_description,
        ac.name as category_name,
        acs.name as subcategory_name,
        ast.name as status_name,
        a.qr_code,
        a.created_at,
        a.updated_at,
        -- Get category-specific details as JSON
        CASE 
          WHEN ac.name = 'IT Equipment' THEN (
            SELECT row_to_json(it)
            FROM it_equipment_details it
            WHERE it.asset_id = a.id
          )
          WHEN ac.name = 'Vehicle' THEN (
            SELECT row_to_json(v)
            FROM vehicle_details v
            WHERE v.asset_id = a.id
          )
          WHEN ac.name = 'Machinery' THEN (
            SELECT row_to_json(m)
            FROM machinery_details m
            WHERE m.asset_id = a.id
          )
          WHEN ac.name = 'Furniture' THEN (
            SELECT row_to_json(f)
            FROM furniture_details f
            WHERE f.asset_id = a.id
          )
          WHEN ac.name = 'Building' THEN (
            SELECT row_to_json(b)
            FROM building_details b
            WHERE b.asset_id = a.id
          )
          WHEN ac.name = 'Land' THEN (
            SELECT row_to_json(l)
            FROM land_details l
            WHERE l.asset_id = a.id
          )
          WHEN ac.name = 'Office Equipment' THEN (
            SELECT row_to_json(o)
            FROM office_equipment_details o
            WHERE o.asset_id = a.id
          )
        END as details
      FROM assets a
      LEFT JOIN asset_categories ac ON a.category_id = ac.id
      LEFT JOIN asset_statuses ast ON a.status_id = ast.id
      LEFT JOIN asset_subcategories acs ON a.subcategory_id = acs.id
      WHERE a.id = $1 AND a.is_active = true
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  // Update asset
  async updateAsset(id: string, data: Partial<AssetRegistrationData>) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const updates: string[] = [];
      const values: any[] = [];
      let paramCount = 1;
      
      const updateableFields = ['asset_name', 'asset_description'];
      for (const field of updateableFields) {
        if (data[field as keyof AssetRegistrationData] !== undefined) {
          const dbField = field.replace(/([A-Z])/g, '_$1').toLowerCase();
          updates.push(`${dbField} = $${paramCount}`);
          values.push(data[field as keyof AssetRegistrationData]);
          paramCount++;
        }
      }
      
      updates.push(`updated_at = CURRENT_TIMESTAMP`);
      
      if (updates.length === 0) {
        throw new Error('No fields to update');
      }
      
      values.push(id);
      const query = `
        UPDATE assets 
        SET ${updates.join(', ')} 
        WHERE id = $${paramCount} AND is_active = true
        RETURNING *
      `;
      
      const result = await client.query(query, values);
      await client.query('COMMIT');
      return result.rows[0] || null;
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Delete asset (soft delete)
  async deleteAsset(id: string) {
    const query = `
      UPDATE assets 
      SET is_active = false, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 AND is_active = true
      RETURNING id
    `;
    const result = await pool.query(query, [id]);
    return result.rows.length > 0;
  }
}