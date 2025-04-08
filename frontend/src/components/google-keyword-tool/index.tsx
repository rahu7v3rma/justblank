"use client";
import { memo, use, useCallback, useContext, useEffect, useState } from "react";
import Button from "../buttons/Button";
import Heading from "../heading";
import Input, { SearchInput } from "../input";
import { useForm } from "react-hook-form";
import { generateKeywords, getCriteriaIdList } from "@/utils/api";
import { LoaderContext } from "@/context/loader";
import { ToastContext } from "@/context/toast";
import Table from "../table";
import { autocompleteKeywords, keywordIdeas as mockKeywordIdeas, questionKeywords } from "@/constants/gkt";

const GoogleKeywordTool = memo(() => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      keyword: "",
      countryCriteriaId: {
        label: "",
        value: "",
      },
    },
    mode: "onChange",
  });

  const [keywordIdeas, setKeywordIdeas] = useState<
    {
      keyword: string;
      avgMonthlySearches: string;
      competition: string;
    }[]
  >([]);

  const onSubmit = useCallback(
    async (formData: {
      keyword: string;
      countryCriteriaId: { label: string; value: string };
    }) => {
      openLoader("Generating keywords");
      const res = await generateKeywords(
        formData.keyword,
        formData.countryCriteriaId.value
      );
      if (!res.success) {
        triggerToast(res.message, "error");
        closeLoader();
        return;
      }
      triggerToast("Keywords generated successfully", "success");
      setKeywordIdeas(res.data);
      closeLoader();
    },
    []
  );

  const [criteriaIdList, setCriteriaIdList] = useState<any[]>([]);
  const { openLoader, closeLoader } = useContext(LoaderContext);
  const { triggerToast } = useContext(ToastContext);

  useEffect(() => {
    openLoader("Fetching locations");
    getCriteriaIdList()
      .then((res) => {
        if (!res.success) {
          triggerToast(res.message, "error");
          return;
        }
        triggerToast("Locations fetched successfully", "success");
        setCriteriaIdList(res.data);
      })
      .finally(() => {
        closeLoader();
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Heading type="h1" className="!text-[50px]">
        Google Keyword Tool
      </Heading>
      <div className="flex flex-row gap-4 mt-4">
        <div className="w-[300px]">
          <Input
            placeholder="Enter a keyword"
            value={watch("keyword")}
            onChange={(e) => setValue("keyword", e.target.value)}
            className="p-4"
          />
        </div>
        <div className="w-[300px]">
          {criteriaIdList.length > 0 && (
            <SearchInput
              placeholder="Select a country"
              value={watch("countryCriteriaId").label}
              onChange={(option) => setValue("countryCriteriaId", option)}
              options={criteriaIdList.map((item) => ({
                label: item.canonicalName,
                value: item.criteriaId,
              }))}
              className="p-4"
            />
          )}
        </div>
        <div className="w-[200px]">
          <Button onClick={handleSubmit(onSubmit)} className="h-full">
            <Heading className="!text-[20px]">Find Keywords</Heading>
          </Button>
        </div>
      </div>
      {keywordIdeas.length > 0 ? (
        <div className="mt-4">
          {keywordIdeas.length > 0 && (
            <Table
              columns={[
                { label: "Keyword", key: "keyword" },
                { label: "Avg Monthly Searches", key: "avgMonthlySearches" },
                { label: "Competition", key: "competition" },
              ]}
              data={keywordIdeas}
            />
          )}
        </div>
      ) : (
        <div className="mt-4 flex flex-row gap-4 items-start">
          <Table
            columns={[
              { label: "Keyword", key: "keyword" },
              { label: "Avg Monthly Searches", key: "avgMonthlySearches" },
              { label: "Competition", key: "competition" },
            ]}
            data={mockKeywordIdeas}
            className="opacity-50"
          />
          <Table
            columns={[
              { label: "Autocomplete", key: "keyword" },
            ]}
            data={autocompleteKeywords}
            className="opacity-50"
          />
          <Table
            columns={[
              { label: "Questions", key: "keyword" },
            ]}
            data={questionKeywords}
            className="opacity-50"
          />
          <Table
            columns={[
              { label: "People also search for", key: "keyword" },
            ]}
            data={questionKeywords}
            className="opacity-50"
          />
        </div>
      )}
    </div>
  );
});

export default GoogleKeywordTool;
