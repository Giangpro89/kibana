/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { EncryptedSavedObjectsPluginSetup } from '@kbn/encrypted-saved-objects-plugin/server';
import { SavedObjectUnsanitizedDoc } from '@kbn/core/server';
import { ConfigKey, SyntheticsMonitorWithSecrets } from '../../../../../../common/runtime_types';
import { SYNTHETICS_MONITOR_ENCRYPTED_TYPE } from '../../synthetics_monitor';

export const migration890 = (encryptedSavedObjects: EncryptedSavedObjectsPluginSetup) => {
  return encryptedSavedObjects.createMigration<
    SyntheticsMonitorWithSecrets,
    SyntheticsMonitorWithSecrets
  >({
    isMigrationNeededPredicate: function shouldBeMigrated(
      doc
    ): doc is SavedObjectUnsanitizedDoc<SyntheticsMonitorWithSecrets> {
      return true;
    },
    migration: (
      doc: SavedObjectUnsanitizedDoc<SyntheticsMonitorWithSecrets>
    ): SavedObjectUnsanitizedDoc<SyntheticsMonitorWithSecrets> => {
      let migrated = doc;
      migrated = {
        ...migrated,
        attributes: {
          ...migrated.attributes,
          [ConfigKey.ALERT_CONFIG]: {
            status: {
              enabled: true,
            },
            tls: {
              enabled: true,
            },
            ...(migrated.attributes[ConfigKey.ALERT_CONFIG] ?? {}),
          },
          // when any action to change a project monitor configuration is taken
          // outside the synthetics agent cli, we should set the config hash back
          // to an empty string so that the project monitors configuration
          // will be updated on next push
          [ConfigKey.CONFIG_HASH]: '',
        },
      };

      return migrated;
    },
    inputType: SYNTHETICS_MONITOR_ENCRYPTED_TYPE,
    migratedType: SYNTHETICS_MONITOR_ENCRYPTED_TYPE,
  });
};
