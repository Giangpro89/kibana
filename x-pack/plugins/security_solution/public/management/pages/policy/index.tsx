/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { memo } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Route } from '@kbn/shared-ux-router';

import { PolicyDetails, PolicyList } from './view';
import {
  MANAGEMENT_ROUTING_POLICY_DETAILS_FORM_PATH,
  MANAGEMENT_ROUTING_POLICY_DETAILS_TRUSTED_APPS_PATH,
  MANAGEMENT_ROUTING_POLICY_DETAILS_EVENT_FILTERS_PATH,
  MANAGEMENT_ROUTING_POLICY_DETAILS_PATH_OLD,
  MANAGEMENT_ROUTING_POLICY_DETAILS_HOST_ISOLATION_EXCEPTIONS_PATH,
  MANAGEMENT_ROUTING_POLICIES_PATH,
  MANAGEMENT_ROUTING_POLICY_DETAILS_BLOCKLISTS_PATH,
} from '../../common/constants';
import { NotFoundPage } from '../../../app/404';
import { getPolicyDetailPath } from '../../common/routing';

export const PolicyContainer = memo(() => {
  return (
    <Switch>
      <Route
        path={[
          MANAGEMENT_ROUTING_POLICY_DETAILS_FORM_PATH,
          MANAGEMENT_ROUTING_POLICY_DETAILS_TRUSTED_APPS_PATH,
          MANAGEMENT_ROUTING_POLICY_DETAILS_EVENT_FILTERS_PATH,
          MANAGEMENT_ROUTING_POLICY_DETAILS_HOST_ISOLATION_EXCEPTIONS_PATH,
          MANAGEMENT_ROUTING_POLICY_DETAILS_BLOCKLISTS_PATH,
        ]}
        exact
        component={PolicyDetails}
      />
      <Route
        path={MANAGEMENT_ROUTING_POLICY_DETAILS_PATH_OLD}
        exact
        render={(props) => <Redirect to={getPolicyDetailPath(props.match.params.policyId)} />}
      />
      <Route path={MANAGEMENT_ROUTING_POLICIES_PATH} exact component={PolicyList} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
});

PolicyContainer.displayName = 'PolicyContainer';
