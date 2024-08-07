import React, { useState, useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "@strapi/design-system/Button";
import Eye from "@strapi/icons/Eye";
import pluginId from "../../pluginId";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";

const ViewSubmissionButton = () => {
  const [displayButton, setDisplayButton] = useState(false);
  const {
    push,
    location: { pathname },
  } = useHistory();
  const { initialData } = useCMEditViewDataManager();

  useEffect(() => {
    const model = pathname.split("/").reverse()[1];
    const enabledCollection = "plugin::strapi-v4-form-builder.form-submission";
    if (enabledCollection.indexOf(model) > -1) {
      setDisplayButton(true);
    }
  }, []);

  const handleViewSubmission = () => {
    push(`/plugins/${pluginId}/${initialData?.id}`);
  };

  return (
    <>
      {displayButton && (
        <Button
          variant="secondary"
          startIcon={<Eye />}
          onClick={handleViewSubmission}
        >
          View Form Submission
        </Button>
      )}
    </>
  );
};

export default ViewSubmissionButton;
