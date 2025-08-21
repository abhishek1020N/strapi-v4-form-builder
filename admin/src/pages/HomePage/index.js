/*
 *
 * HomePage
 *
 */

import {
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
  VisuallyHidden,
  IconButton,
  Dots,
  NextLink,
  PageLink,
  Pagination,
  PreviousLink,
} from "@strapi/design-system";
import { Eye } from "@strapi/icons";
import { useFetchClient } from "@strapi/helper-plugin";
import qs from "qs";
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import pluginId from "../../pluginId";
import useSWR from "swr";
import ExportPage from "../../components/ExportPage";

const HomePage = () => {
  const history = useHistory();
  const { search } = useLocation();
  const { get } = useFetchClient();
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const [exportData, setExportData] = useState([]);
  const formType = query?.typeUID ?? null;
  const page = query?.page ?? 1;

  const formTypeParams = qs.stringify({
    populate: {
      formFields: {
        fields: ["label", "submissionKey"],
      },
    },
  });
  const formSubmissionParams = qs.stringify({
    filters: {
      formType: { formID: { $eq: formType } },
    },
    populate: "*",
    pagination: {
      page,
      pageSize: 10,
    },
  });

  const { data: formTypes } = useSWR("form-types", () =>
    get(`/strapi-v4-form-builder/form-types?${formTypeParams}`).then(
      (res) => res?.data?.data
    )
  );
  const { data: formSubmissions } = useSWR(
    formType ? `form-submissions-${formType}-${formSubmissionParams}` : null,
    () =>
      get(
        `/strapi-v4-form-builder/get-form-submissions?${formSubmissionParams}`
      ).then((res) => res?.data)
  );

  const handleChangeSelect = (newTypeUID) => {
    history.push(`/plugins/${pluginId}?typeUID=${newTypeUID}`);
  };

  const getPageRoute = (pageNumber) => {
    const newParams = qs.stringify({
      ...query,
      page: pageNumber,
    });

    return `/plugins/${pluginId}?${newParams}`;
  };

  const getValueByKey = (obj, key) => {
    const submission = obj.attributes.jsonSubmission.find(
      (sub) => sub.key === key
    );
    return submission ? submission.value : null;
  };

  const firstField = formTypes?.find(
    (sub) => sub?.attributes?.formID === formType
  )?.attributes?.formFields?.[0];

  const paginationMeta = formSubmissions?.meta?.pagination;

  useEffect(() => {
    (async () => {
      // get only filter and populate and not pagiantion
      const formSubmissionParamsWithoutPagination = qs.stringify({
        filters: {
          formType: { formID: { $eq: formType } },
        },
        populate: "*",
      });
      const {
        data: { data },
      } = await get(`/strapi-v4-form-builder/get-all-form-submissions?${formSubmissionParamsWithoutPagination}`);
      // console.log("submit-data:", data);
      setExportData(data);
    })();
  }, [formType, get]);
  

  return (
    <>
      <BaseHeaderLayout
        title="Form Builder"
        subtitle="This module is designed to build forms for website through strapi CMS"
        as="h2"
      />
      <ContentLayout>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginBottom="24px"
        >
          <Box flex="1" maxWidth="15%" marginRight="16px">
            {formTypes?.length ? (
              <SingleSelect
                label="Form Type"
                placeholder="Select your Form type"
                value={formType}
                onChange={handleChangeSelect}
              >
                {formTypes?.map((item) => (
                  <SingleSelectOption
                    key={item.attributes.formID}
                    value={item.attributes.formID}
                  >
                    {item.attributes.formName}
                  </SingleSelectOption>
                ))}
              </SingleSelect>
            ) : (
              "Please configure Form Types"
            )}
          </Box>
          {/* Export to Excel Button */}
          {formType ? <ExportPage data={exportData} form_name={formType} /> : null}
        </Flex>

        {formType ? (
          <Box background="neutral100">
            <Table colCount={10} rowCount={6}>
              <Thead>
                <Tr>
                  {/* <Th>
                <BaseCheckbox aria-label="Select all entries" />
              </Th> */}
                  <Th>
                    <Typography variant="sigma">ID</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">{firstField?.label}</Typography>
                  </Th>
                  <Th>
                    <VisuallyHidden>Actions</VisuallyHidden>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {formSubmissions?.data?.map((entry) => (
                  <Tr key={entry.id}>
                    {/* <Td>
                  <BaseCheckbox aria-label={`Select ${entry.contact}`} />
                </Td> */}
                    <Td>
                      <Typography textColor="neutral800">
                        {entry?.id}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">
                        {getValueByKey(entry, firstField?.submissionKey)}
                      </Typography>
                    </Td>
                    <Td>
                      <IconButton
                        onClick={() =>
                          history.push(`/plugins/${pluginId}/${entry?.id}`)
                        }
                        label="View"
                        noBorder
                        icon={<Eye />}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Flex justifyContent="center" marginTop={3}>
              <Pagination
                activePage={paginationMeta?.page}
                pageCount={paginationMeta?.pageCount}
              >
                {paginationMeta?.page > 1 && (
                  <PreviousLink to={getPageRoute(paginationMeta?.page - 1)}>
                    Go to previous page
                  </PreviousLink>
                )}
                <PageLink number={1} to={getPageRoute(1)}>
                  Go to page 1
                </PageLink>
                {paginationMeta?.pageCount > 1 && (
                  <PageLink number={2} to={getPageRoute(2)}>
                    Go to page 2
                  </PageLink>
                )}
                {paginationMeta?.pageCount > 2 && (
                  <>
                    <Dots>And {paginationMeta?.pageCount - 3} other links</Dots>
                    <PageLink
                      number={paginationMeta?.pageCount}
                      to={getPageRoute(paginationMeta?.pageCount)}
                    >
                      Go to page {paginationMeta?.pageCount}
                    </PageLink>
                  </>
                )}
                {paginationMeta?.page < paginationMeta?.pageCount && (
                  <NextLink to={getPageRoute(paginationMeta?.page + 1)}>
                    Go to next page
                  </NextLink>
                )}
              </Pagination>
            </Flex>
          </Box>
        ) : null}
      </ContentLayout>
    </>
  );
};

export default HomePage;
