// src/services/asset.service.ts
import { pool } from '../config/database.js';
import { AssetRegistrationData } from '../types/asset.types.js';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';

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

  // Generate unique QR code with optimized data
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
    department?: string,
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
    if (department) lines.push(`Dept: ${department.substring(0, 20)}`);
    if (brand) lines.push(`Brand: ${brand.substring(0, 20)}`);
    if (model) lines.push(`Model: ${model.substring(0, 20)}`);
    if (serial) lines.push(`SN: ${serial.substring(0, 15)}`);
    if (status) lines.push(`Status: ${status}`);
    
    // Short description (max 40 chars)
    if (description) {
      const shortDesc = description.length > 35 ? description.substring(0, 32) + '...' : description;
      lines.push(`Desc: ${shortDesc}`);
    }
    
    // Add ONLY the most important category-specific details
    if (categoryDetails) {
      lines.push('─────────────────────');
      
      // IT Equipment - show only key specs
      if (category === 'IT Equipment') {
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
        if (categoryDetails.floor_area) lines.push(`Area: ${categoryDetails.floor_area}sqft`);
        if (categoryDetails.number_of_floors) lines.push(`Floors: ${categoryDetails.number_of_floors}`);
        if (categoryDetails.construction_year) lines.push(`Year: ${categoryDetails.construction_year}`);
        if (categoryDetails.occupancy_type) lines.push(`Occ: ${categoryDetails.occupancy_type}`);
      }
      
      // Land - show only essential info
      else if (category === 'Land') {
        if (categoryDetails.land_area) lines.push(`Area: ${categoryDetails.land_area}acres`);
        if (categoryDetails.zoning) lines.push(`Zoning: ${categoryDetails.zoning}`);
        if (categoryDetails.soil_type) lines.push(`Soil: ${categoryDetails.soil_type}`);
      }
      
      // Office Equipment - show only essential info
      else if (category === 'Office Equipment') {
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

  // Get department ID by name
  private async getDepartmentId(departmentName: string): Promise<string | null> {
    if (!departmentName) return null;
    const query = `SELECT id FROM departments WHERE name = $1`;
    const result = await pool.query(query, [departmentName]);
    return result.rows.length > 0 ? result.rows[0].id : null;
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
      const departmentId = data.department ? await this.getDepartmentId(data.department) : null;
      const assetCode = await this.generateAssetCode(data.category);
      
      // Generate unique QR code with optimized data
      const assetId = uuidv4();
      
      // Prepare category details (only essential fields)
      let categoryDetails = {};
      
      if (data.category === 'IT Equipment') {
        categoryDetails = {
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
          floor_area: data.floorArea,
          number_of_floors: data.numberOfFloors,
          construction_year: data.constructionYear,
          occupancy_type: data.occupancyType
        };
      } else if (data.category === 'Land') {
        categoryDetails = {
          land_area: data.landArea,
          zoning: data.zoning,
          soil_type: data.soilType
        };
      } else if (data.category === 'Office Equipment') {
        categoryDetails = {
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
        data.department,
        categoryDetails
      );
      
      console.log('Category ID:', categoryId);
      console.log('Status ID:', statusId);
      console.log('Subcategory ID:', subcategoryId);
      console.log('Department ID:', departmentId);
      console.log('Asset Code:', assetCode);
      
      // Insert main asset with QR code
      const assetQuery = `
        INSERT INTO assets (
          id, asset_code, asset_name, asset_description,
          category_id, subcategory_id, status_id, department_id,
          acquisition_date, acquisition_cost,
          qr_code, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8,
          CURRENT_DATE, 0,
          $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
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
        departmentId,
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
          id, asset_id, model_number, serial_number,
          processor, ram, storage, operating_system,
          monitor_size, connectivity, warranty_expiry_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `;
      await client.query(query, [
        uuidv4(),
        assetId,
        data.modelNumber || null,
        data.serialNumber || null,
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
          id, asset_id, power_rating, voltage,
          phase, weight, dimensions, operating_temperature,
          safety_certification, last_inspection_date, next_inspection_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `;
      await client.query(query, [
        uuidv4(),
        assetId,
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
          id, asset_id, floor_area, number_of_floors,
          construction_year, building_material, occupancy_type,
          utilities, parking_available, security_features
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `;
      await client.query(query, [
        uuidv4(),
        assetId,
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
          id, asset_id, land_area, zoning,
          soil_type, topography, utilities_available, accessibility
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      await client.query(query, [
        uuidv4(),
        assetId,
        data.landArea || null,
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
          id, asset_id, power_consumption,
          connectivity, paper_capacity, print_speed, functions
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      await client.query(query, [
        uuidv4(),
        assetId,
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
        d.name as department_name,
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
      LEFT JOIN departments d ON a.department_id = d.id
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
        d.name as department_name,
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
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.id = $1 AND a.is_active = true
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  // Update asset
  async updateAsset(id: string, data: AssetRegistrationData): Promise<any> {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Check if asset exists
      const checkQuery = `SELECT id, category_id FROM assets WHERE id = $1 AND is_active = true`;
      const checkResult = await client.query(checkQuery, [id]);
      if (checkResult.rows.length === 0) {
        throw new Error('Asset not found');
      }
      
      // Get category name
      const categoryQuery = `SELECT name FROM asset_categories WHERE id = $1`;
      const categoryResult = await client.query(categoryQuery, [checkResult.rows[0].category_id]);
      const categoryName = categoryResult.rows[0].name;
      
      // Get IDs
      const categoryId = await this.getCategoryId(data.category);
      const statusId = await this.getStatusId(data.status);
      const subcategoryId = data.subcategory ? await this.getSubcategoryId(categoryId, data.subcategory) : null;
      const departmentId = data.department ? await this.getDepartmentId(data.department) : null;
      
      // Regenerate QR code with updated data
      const assetId = id;
      
      // Prepare category details for QR
      let categoryDetails = {};
      if (data.category === 'IT Equipment') {
        categoryDetails = {
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
          floor_area: data.floorArea,
          number_of_floors: data.numberOfFloors,
          construction_year: data.constructionYear,
          occupancy_type: data.occupancyType
        };
      } else if (data.category === 'Land') {
        categoryDetails = {
          land_area: data.landArea,
          zoning: data.zoning,
          soil_type: data.soilType
        };
      } else if (data.category === 'Office Equipment') {
        categoryDetails = {
          power_consumption: data.powerConsumption,
          print_speed: data.printSpeed,
          functions: data.functions
        };
      }
      
      // Get asset code from existing asset
      const assetCodeQuery = `SELECT asset_code FROM assets WHERE id = $1`;
      const assetCodeResult = await client.query(assetCodeQuery, [id]);
      const assetCode = assetCodeResult.rows[0].asset_code;
      
      // Generate new QR code
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
        data.department,
        categoryDetails
      );
      
      // Update main asset
      const updateQuery = `
        UPDATE assets SET
          asset_name = $1,
          asset_description = $2,
          category_id = $3,
          subcategory_id = $4,
          status_id = $5,
          department_id = $6,
          brand = $7,
          qr_code = $8,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $9 AND is_active = true
        RETURNING id, asset_code
      `;
      
      const updateValues = [
        data.assetName,
        data.assetDescription || null,
        categoryId,
        subcategoryId,
        statusId,
        departmentId,
        data.brand || null,
        qrCode,
        id
      ];
      
      const updateResult = await client.query(updateQuery, updateValues);
      
      if (updateResult.rows.length === 0) {
        throw new Error('Asset not found or already deleted');
      }
      
      // Update category-specific details
      await this.updateCategoryDetails(client, id, data);
      
      await client.query('COMMIT');
      
      return {
        success: true,
        message: 'Asset updated successfully',
        data: {
          id: updateResult.rows[0].id,
          assetCode: updateResult.rows[0].asset_code,
          qrCode: qrCode
        }
      };
      
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error updating asset:', error);
      throw error;
    } finally {
      client.release();
    }
  }

   private async updateCategoryDetails(client: any, assetId: string, data: AssetRegistrationData): Promise<void> {
    const category = data.category;
    
    // IT Equipment
    if (category === 'IT Equipment') {
      const query = `
        UPDATE it_equipment_details SET
          model_number = $1,
          serial_number = $2,
          processor = $3,
          ram = $4,
          storage = $5,
          operating_system = $6,
          monitor_size = $7,
          connectivity = $8,
          warranty_expiry_date = $9,
          updated_at = CURRENT_TIMESTAMP
        WHERE asset_id = $10
      `;
      await client.query(query, [
        data.modelNumber || null,
        data.serialNumber || null,
        data.processor || null,
        data.ram || null,
        data.storage || null,
        data.operatingSystem || null,
        data.monitorSize || null,
        data.connectivity || null,
        data.warrantyExpiry || null,
        assetId
      ]);
    }
    
    // Vehicle
    else if (category === 'Vehicle') {
      const query = `
        UPDATE vehicle_details SET
          registration_number = $1,
          make = $2,
          model = $3,
          manufacturing_year = $4,
          engine_number = $5,
          vin_number = $6,
          fuel_type = $7,
          engine_capacity = $8,
          transmission = $9,
          seating_capacity = $10,
          insurance_policy_number = $11,
          insurance_expiry_date = $12,
          registration_expiry_date = $13,
          updated_at = CURRENT_TIMESTAMP
        WHERE asset_id = $14
      `;
      await client.query(query, [
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
        data.registrationExpiry || null,
        assetId
      ]);
    }
    
    // Machinery
    else if (category === 'Machinery') {
      const query = `
        UPDATE machinery_details SET
          power_rating = $1,
          voltage = $2,
          phase = $3,
          weight = $4,
          dimensions = $5,
          operating_temperature = $6,
          safety_certification = $7,
          last_inspection_date = $8,
          next_inspection_date = $9,
          updated_at = CURRENT_TIMESTAMP
        WHERE asset_id = $10
      `;
      await client.query(query, [
        data.powerRating || null,
        data.voltage || null,
        data.phase || null,
        data.weight ? parseFloat(data.weight) : null,
        data.dimensions || null,
        data.operatingTemperature || null,
        data.safetyCertification || null,
        data.lastInspection || null,
        data.nextInspection || null,
        assetId
      ]);
    }
    
    // Furniture
    else if (category === 'Furniture') {
      const query = `
        UPDATE furniture_details SET
          material = $1,
          color = $2,
          dimensions = $3,
          weight_capacity = $4,
          assembly_required = $5,
          warranty_period = $6,
          updated_at = CURRENT_TIMESTAMP
        WHERE asset_id = $7
      `;
      await client.query(query, [
        data.material || null,
        data.color || null,
        data.dimensionsFurniture || null,
        data.weightCapacity ? parseFloat(data.weightCapacity) : null,
        data.assemblyRequired === 'Yes' ? true : false,
        data.warrantyPeriod || null,
        assetId
      ]);
    }
    
    // Building
    else if (category === 'Building') {
      const query = `
        UPDATE building_details SET
          floor_area = $1,
          number_of_floors = $2,
          construction_year = $3,
          building_material = $4,
          occupancy_type = $5,
          utilities = $6,
          parking_available = $7,
          security_features = $8,
          updated_at = CURRENT_TIMESTAMP
        WHERE asset_id = $9
      `;
      await client.query(query, [
        data.floorArea || null,
        data.numberOfFloors ? parseInt(data.numberOfFloors) : null,
        data.constructionYear ? parseInt(data.constructionYear) : null,
        data.buildingMaterial || null,
        data.occupancyType || null,
        data.utilities || null,
        data.parkingAvailable === 'Yes' ? true : false,
        data.securityFeatures || null,
        assetId
      ]);
    }
    
    // Land
    else if (category === 'Land') {
      const query = `
        UPDATE land_details SET
          land_area = $1,
          zoning = $2,
          soil_type = $3,
          topography = $4,
          utilities_available = $5,
          accessibility = $6,
          updated_at = CURRENT_TIMESTAMP
        WHERE asset_id = $7
      `;
      await client.query(query, [
        data.landArea || null,
        data.zoning || null,
        data.soilType || null,
        data.topography || null,
        data.utilitiesAvailable || null,
        data.accessibility || null,
        assetId
      ]);
    }
    
    // Office Equipment
    else if (category === 'Office Equipment') {
      const query = `
        UPDATE office_equipment_details SET
          power_consumption = $1,
          connectivity = $2,
          paper_capacity = $3,
          print_speed = $4,
          functions = $5,
          updated_at = CURRENT_TIMESTAMP
        WHERE asset_id = $6
      `;
      await client.query(query, [
        data.powerConsumption || null,
        data.connectivityOffice || null,
        data.paperCapacity || null,
        data.printSpeed || null,
        data.functions || null,
        assetId
      ]);
    }
  }

  // Delete asset (soft delete)
  async deleteAsset(id: string): Promise<boolean> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Soft delete the asset
      const query = `
        UPDATE assets 
        SET is_active = false, 
            updated_at = CURRENT_TIMESTAMP 
        WHERE id = $1 AND is_active = true
        RETURNING id, asset_code, asset_name
      `;
      const result = await client.query(query, [id]);
      
      if (result.rows.length === 0) {
        await client.query('ROLLBACK');
        return false;
      }
      
      await client.query('COMMIT');
      return true;
      
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error deleting asset:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}