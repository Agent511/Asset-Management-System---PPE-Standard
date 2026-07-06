// src/controllers/asset.controller.ts
import { Request, Response } from 'express';
import { AssetService } from '../services/asset.service.js';

export class AssetController {
  private assetService: AssetService;

  constructor() {
    this.assetService = new AssetService();
  }

  registerAsset = async (req: Request, res: Response) => {
    try {
      const result = await this.assetService.registerAsset(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      console.error('Error in registerAsset:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to register asset'
      });
    }
  };

  getAllAssets = async (req: Request, res: Response) => {
    try {
      const assets = await this.assetService.getAllAssets();
      res.status(200).json({
        success: true,
        data: assets
      });
    } catch (error: any) {
      console.error('Error in getAllAssets:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch assets'
      });
    }
  };

  getAssetById = async (req: Request, res: Response) => {
    try {
      const asset = await this.assetService.getAssetById(req.params.id);
      if (!asset) {
        return res.status(404).json({
          success: false,
          error: 'Asset not found'
        });
      }
      res.status(200).json({
        success: true,
        data: asset
      });
    } catch (error: any) {
      console.error('Error in getAssetById:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch asset'
      });
    }
  };

  updateAsset = async (req: Request, res: Response) => {
    try {
      const result = await this.assetService.updateAsset(req.params.id, req.body);
      res.status(200).json(result);
    } catch (error: any) {
      console.error('Error in updateAsset:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to update asset'
      });
    }
  };

  deleteAsset = async (req: Request, res: Response) => {
    try {
      const deleted = await this.assetService.deleteAsset(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Asset not found'
        });
      }
      res.status(200).json({
        success: true,
        message: 'Asset deleted successfully'
      });
    } catch (error: any) {
      console.error('Error in deleteAsset:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to delete asset'
      });
    }
  };
}