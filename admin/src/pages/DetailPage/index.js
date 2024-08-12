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
  Link,
} from "@strapi/design-system";
import { File, FilePdf, Download as DownloadIcon } from "@strapi/icons";
import { useFetchClient, getFileExtension } from "@strapi/helper-plugin";
import qs from "qs";
import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { downloadFile } from "../../utils/downloadFile";
import { createAssetUrl } from "../../utils/createAssetUrl";

const DetailPage = () => {
  const urlParams = useParams();
  const { get } = useFetchClient();
  const [hiddenFieldData, setHiddenFieldData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchConfig = async (collectionData, relatedModel) => {
      try {
        setLoading(true);
        const config = await get(
          `/content-manager/content-types/${relatedModel}/configuration`
        );
        // Create the new data entry
        const newData = {
          model: relatedModel,
          id: collectionData?.data?.id,
          data: collectionData?.data,
          meta: config?.data?.data?.contentType?.settings,
        };
        // Update the state by pushing the new data to the array
        setHiddenFieldData((prevData) => [...prevData, newData]);
      } catch (error) {
        console.error("Error fetching configuration:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCollectionData = async (id, model) => {
      try {
        const collectionData = await get(
          `/content-manager/collection-types/${model}/${id}`
        );
        if (collectionData) {
          fetchConfig(collectionData, model);
        }
      } catch (error) {}
    };

    if (data) {
      const formType = data?.attributes?.formType?.data?.attributes;
      const hiddenFields = Object.values(formType?.formFields || {}).filter(
        (f) => f.fieldType === "hidden"
      );
      if (hiddenFields.length > 0) {
        for (let i = 0; i < hiddenFields.length; i++) {
          const h = hiddenFields[i];
          const [hiddenFieldSubmission] = jsonSubmissions?.filter(
            (f) => f.key === h.submissionKey
          );
          if (h.relatedModel) {
            fetchCollectionData(hiddenFieldSubmission?.value, h.relatedModel);
          }
        }
      }
    }
  }, [data, get]);

  if (!data) return null;

  const formType = data?.attributes?.formType?.data?.attributes;
  const jsonSubmissions = data?.attributes?.jsonSubmission;

  // // "text",
  // // "number",
  // // "email",
  // // "textarea",
  // // "select",
  // // "upload",
  // // "date",
  // // "datetime",
  // // "time",
  // // "checkbox",
  // // "radio",
  // // "hidden",
  // // "phone",
  // // "rating",
  // // "multiselect"

  const getFieldComponent = (field, index) => {
    const [formFieldType] = Object.values(formType?.formFields || {}).filter(
      (f) => f.submissionKey === field?.key
    );

    switch (field?.fieldType) {
      case "upload":
        return (
          <GridItem key={index} background="primary200" padding={1} hasRadius>
            <UploadComponent field={field} />
          </GridItem>
        );

      case "checkbox":
        return (
          <GridItem key={index} background="primary200" padding={1} hasRadius>
            <Typography style={{ display: "block", fontWeight: "bold" }}>
              {field?.label}
            </Typography>
            <Typography style={{ display: "block" }}>
              {!!field?.value ? "Yes" : "No"}
            </Typography>
          </GridItem>
        );

      case "hidden":
        if (formFieldType?.relatedModel) {
          const link_url = `/admin/content-manager/collection-types/${formFieldType?.relatedModel}/${field?.value}`;
          // console.log(hiddenFieldData);
          if (hiddenFieldData?.length) {
            const [hiddenFieldObj] = hiddenFieldData?.filter(
              (f) =>
                f.model == formFieldType?.relatedModel && f.id == field?.value
            );
            // console.log(hiddenFieldObj);
            const displayFieldValue =
              hiddenFieldObj?.data[hiddenFieldObj?.meta?.mainField] ??
              field?.value;

            return (
              <GridItem
                key={index}
                background="primary200"
                padding={1}
                hasRadius
              >
                <Typography style={{ display: "block", fontWeight: "bold" }}>
                  {field?.label}
                </Typography>
                <Link href={link_url}>
                  <Typography style={{ display: "block" }}>
                    {displayFieldValue}
                  </Typography>
                </Link>
              </GridItem>
            );
          }
        }
        return null;

      default:
        return (
          <GridItem key={index} background="primary200" padding={1} hasRadius>
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
        subtitle="This module is designed to build forms for website through Strapi CMS"
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
          {loading ? (
            <Typography>Loading configuration...</Typography>
          ) : (
            jsonSubmissions
              ?.sort((a, b) => b?.fieldOrder - a?.fieldOrder)
              ?.map(getFieldComponent)
          )}
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
    setSelectedIndex((current) =>
      current < files.length - 1 ? current + 1 : 0
    );
  };

  const handlePrevious = () => {
    setSelectedIndex((current) =>
      current > 0 ? current - 1 : files.length - 1
    );
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
          ) : getFileExtension(file.ext) === "pdf" ? (
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
