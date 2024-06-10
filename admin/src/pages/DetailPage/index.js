/*
 *
 * DetailPage
 *
 */

import {
  CarouselInput,
  CarouselSlide,
  CarouselImage,
  Grid,
  GridItem,
  BaseHeaderLayout,
  ContentLayout,
  Typography,
  IconButton,
} from "@strapi/design-system";
import { File, FilePdf, Download as DownloadIcon } from "@strapi/icons";
import { useFetchClient, getFileExtension } from "@strapi/helper-plugin";
import qs from "qs";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { downloadFile } from "../../utils/downloadFile";
import { createAssetUrl } from "../../utils/createAssetUrl";

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

const AssetType = {
  Video: "video",
  Image: "image",
  Document: "doc",
  Audio: "audio",
};

const UploadComponent = ({ field = [] }) => {
  const files =
    field?.files?.map((file) => ({
      ...file,
      url: createAssetUrl(file, true), // Process the file URL using your utility function
    })) || [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () => {
    setSelectedIndex((current) => (current < 2 ? current + 1 : 0));
  };

  const handlePrevious = () => {
    setSelectedIndex((current) => (current > 0 ? current - 1 : 2));
  };

  return (
    <CarouselInput
      label={`${field?.label} - (${selectedIndex + 1}/${files?.length})`}
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
          {file.mime.includes(AssetType.Image) ? (
            <CarouselImage src={file?.url} alt={file?.name} />
          ) : getFileExtension(file.ext) == "pdf" ? (
            <FilePdf aria-label={file?.name} />
          ) : (
            <File aria-label={file?.name} />
          )}
          <IconButton
            label="Download"
            icon={<DownloadIcon />}
            onClick={() => downloadFile(file?.url, file.name)}
          />
        </CarouselSlide>
      ))}
    </CarouselInput>
  );
};

export default DetailPage;
