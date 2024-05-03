/*
 *
 * HomePage
 *
 */

import React from "react";

import {
  EmptyStateLayout,
  BaseHeaderLayout,
  ContentLayout,
} from "@strapi/design-system";
import Illo from "../../components/illo";

const HomePage = () => {
  return (
    <>
      <BaseHeaderLayout
        title="Form Builder"
        subtitle="This module is designed to build forms for website through strapi CMS"
        as="h2"
      />
      <ContentLayout>
        <EmptyStateLayout icon={<Illo />} content="Coming Soon" />
      </ContentLayout>
    </>
  );
};

export default HomePage;
