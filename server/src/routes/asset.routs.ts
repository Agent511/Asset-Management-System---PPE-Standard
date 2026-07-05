import { Router, Request, Response } from 'express';
import { AssetService } from '../services/asset.service.ts';
import { AssetRegistrationData } from '../types/asset.types.ts';

const router = Router();
const assetService = new AssetService();

// Register new asset
router.post('/register', async (req: Request, res: Response) => {
  try {
    const data: AssetRegistrationData = req.body;
    
    // Validation
    if (!data.assetName || !data.category || !data.status) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: assetName, category, and status are required'
      });
    }

    const result = await assetService.registerAsset(data);
    res.status(201).json(result);
    
  } catch (error: any) {
    console.error('Error registering asset:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to register asset'
    });
  }
});

// Get all assets
router.get('/', async (req: Request, res: Response) => {
  try {
    const assets = await assetService.getAllAssets();
    res.json({
      success: true,
      data: assets,
      count: assets.length
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch assets'
    });
  }
});

// Get asset by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Type guard to ensure id is a string
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid asset ID'
      });
    }
    
    const asset = await assetService.getAssetById(id);
    
    if (!asset) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }
    
    // Get category-specific details
    const details = await assetService.getAssetDetails(id, asset.category_name);
    
    res.json({
      success: true,
      data: { ...asset, details }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch asset'
    });
  }
});

// Update asset
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Type guard to ensure id is a string
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid asset ID'
      });
    }
    
    const data = req.body;
    
    const updated = await assetService.updateAsset(id, data);
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Asset updated successfully',
      data: updated
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to update asset'
    });
  }
});

// Delete asset (soft delete)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Type guard to ensure id is a string
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid asset ID'
      });
    }
    
    const deleted = await assetService.deleteAsset(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Asset deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete asset'
    });
  }
});

export default router;