/*
 *
 * DetailPage
 *
 */

import {
  CarouselInput,
  CarouselSlide,
  CarouselImage,
  CarouselActions,
  Grid,
  GridItem,
  BaseHeaderLayout,
  Box,
  ContentLayout,
  Flex,
  SingleSelect,
  SingleSelectOption,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Typography,
} from "@strapi/design-system";
import { useFetchClient } from "@strapi/helper-plugin";
import qs from "qs";
import React, { useState } from "react";
import { useLocation, useParams, Redirect } from "react-router-dom";
import useSWR from "swr";

const DetailPage = () => {
  const urlParams = useParams();
  const { get } = useFetchClient();

  const submissionId = urlParams?.id;

  const params = qs.stringify({
    fields: ["jsonSubmission"],
    populate: "*",
    filters: {
      id: {
        $eq: submissionId,
      },
    },
  });

  const { data } = useSWR(`form-submission-${submissionId}`, () =>
    get(`/strapi-v4-form-builder/get-form-submissions?${params}`).then(
      (res) => res?.data?.data?.[0]
    )
  );

  if (!data) return null;

  const formType = data?.attributes?.formType?.data?.attributes;
  const jsonSubmissions = data?.attributes?.jsonSubmission;

  // "text",
  // "number",
  // "email",
  // "textarea",
  // "select",
  // "upload",
  // "date",
  // "checkbox",
  // "radio",
  // "hidden"

  const getFieldComponent = (field, index) => {
    switch (field?.fieldType) {
      case "upload":
        return (
          <GridItem background="primary200" padding={1} hasRadius>
            <UploadComponent field={field} />
          </GridItem>
        );
      case "checkbox":
        return (
          <GridItem background="primary200" padding={1} hasRadius>
            <Typography style={{ display: "block", fontWeight: "bold" }}>
              {field?.label}
            </Typography>
            <Typography style={{ display: "block" }}>
              {!!field?.value ? "Yes" : "No"}
            </Typography>
          </GridItem>
        );
      default:
        return (
          <GridItem background="primary200" padding={1} hasRadius>
            <Typography style={{ display: "block", fontWeight: "bold" }}>
              {field?.label}
            </Typography>
            <Typography style={{ display: "block" }}>{field?.value}</Typography>
          </GridItem>
        );
    }
  };

  return (
    <>
      <BaseHeaderLayout
        title={formType?.formName}
        subtitle="This module is designed to build forms for website through strapi CMS"
        as="h2"
      />

      <ContentLayout>
        <Grid
          gap={5}
          gridCols={2}
          style={{
            alignItems: "start",
          }}
        >
          {jsonSubmissions
            ?.sort((a, b) => b?.fieldOrder - a?.fieldOrder)
            ?.map(getFieldComponent)}
        </Grid>
      </ContentLayout>
    </>
  );
};

const UploadComponent = ({ field = [] }) => {
  const files = field?.files ?? [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () => {
    setSelectedIndex((current) => (current < 2 ? current + 1 : 0));
  };

  const handlePrevious = () => {
    setSelectedIndex((current) => (current > 0 ? current - 1 : 2));
  };

  return (
    <CarouselInput
      label={`${field?.label} - (${selectedIndex + 1}/3)`}
      selectedSlide={selectedIndex}
      previousLabel="Previous slide"
      nextLabel="Next slide"
      onNext={handleNext}
      onPrevious={handlePrevious}
    >
      {files?.map((file, index) => (
        <CarouselSlide
          key={file?.id}
          label={`${index + 1} of ${files?.length} slides`}
        >
          <CarouselImage src={file?.url} alt={file?.name} />
        </CarouselSlide>
      ))}

      <CarouselSlide label="2 of 3 slides">
        <CarouselImage src={"/second.png"} alt="second" />
      </CarouselSlide>
      <CarouselSlide label="3 of 3 slides">
        <CarouselImage src={"/third.png"} alt="third" />
      </CarouselSlide>
    </CarouselInput>
  );
};

export default DetailPage;
