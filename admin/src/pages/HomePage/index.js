/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  HeaderLayout,
  EmptyStateLayout,
  BaseHeaderLayout,
  ContentLayout,
  Layout,
  Select,
  Option,
  Box,
  Grid,
  Flex,
  NumberInput,
  Checkbox,
  Alert,
} from "@strapi/design-system";

import { useFetchClient } from "@strapi/helper-plugin";

import Illo from "../../components/illo";

const HomePage = () => {
  const [formTypes, setFormTypes] = useState([]);
  const { search } = useLocation();
  const { get } = useFetchClient();
  const query = new URLSearchParams(search);
  const selectedTypeUID = query.get("typeUID") || null;
  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await get("/strapi-v4-form-builder/form-types");
      console.log(data);
      setFormTypes(data);
    })();
  }, []);
  const handleChangeSelect = (newTypeUID) => {
    console.log(newTypeUID);
    (async () => {
      const {
        data: { data },
      } = await get("/strapi-v4-form-builder/form-submissions");
      console.log(data);
      setFormTypes(data);
    })();
  };
  return (
    <>
      <BaseHeaderLayout
        title="Form Builder"
        subtitle="This module is designed to build forms for website through strapi CMS"
        as="h2"
      />
      <ContentLayout>
        <Flex gap="16px">
          <Box flex="1" marginBottom="24px">
            {formTypes?.length ? (
              <Select
                label="Form Type"
                placeholder="Select your Form type"
                value={selectedTypeUID}
                onChange={handleChangeSelect}
              >
                {formTypes?.map((item) => (
                  <Option
                    key={item.attributes.formID}
                    value={item.attributes.formID}
                  >
                    {item.attributes.formName}
                  </Option>
                ))}
              </Select>
            ) : (
              "Please configure Form Types"
            )}
          </Box>
          <Box flex="1"></Box>
        </Flex>
      </ContentLayout>
    </>
  );
};

export default HomePage;
