import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_KEYS } from 'src/common/constants/cache-keys.constant';
import { SETTINGS } from 'src/common/constants/settings.constant';
import { ISettings } from 'src/common/interfaces/setting.interface';
import { cacheHelper } from 'src/common/utils/redis.util';
import {
  Settings,
  SettingsDocument,
} from 'src/module/v1/settings/schema/settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<SettingsDocument>,
  ) {}
  async loadSettings() {
    // Load settings from setting constant to the cache if not exist
    const getSettings = await cacheHelper.getCache(CACHE_KEYS.SETTINGS);

    if (!getSettings) {
      // check if setting is in db and load it to cache
      const getSettingsFromDb = await this.settingsModel
        .findOne()
        .sort({ createdAt: -1 });

      if (getSettingsFromDb) {
        await cacheHelper.setCache(
          CACHE_KEYS.SETTINGS,
          getSettingsFromDb.settings,
        );
      } else {
        await cacheHelper.setCache(CACHE_KEYS.SETTINGS, SETTINGS);
      }
    }
  }

  async getSettings() {
    const getSettings = await cacheHelper.getCache(CACHE_KEYS.SETTINGS);
    return getSettings;
  }

  async updateSettings(userId: string, settings: ISettings) {
    const prevSetting = await cacheHelper.getCache(CACHE_KEYS.SETTINGS);

    // save previous setting
    await this.settingsModel.create({
      updatedBy: userId,
      settings: prevSetting,
    });

    await cacheHelper.setCache(CACHE_KEYS.SETTINGS, settings);

    // return the updated setting
    const getSettings = await cacheHelper.getCache(CACHE_KEYS.SETTINGS);

    // save the new setting to the database
    await this.settingsModel.create({ updatedBy: userId, settings });

    return getSettings;
  }
}
