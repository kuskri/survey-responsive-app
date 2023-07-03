"use client";
import Button from "@/app/components/Button";
import SurveyRow from "@/app/components/SurveyRow";
import { ResponseOptionType, SurveyRespType } from "@/app/page";
import { useParams, useRouter } from "next/navigation";
import React, { FC, useEffect, useMemo, useState } from "react";
import useSWR, { Fetcher } from "swr";
import useSWRMutation from "swr/mutation";

async function sendRequest(url: string, { arg }: { arg: string }) {
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
  });
}

const Page: FC = () => {
  const { surveyId } = useParams();
  const router = useRouter();

  const [optionsDisabled, setOptionsDisabled] = useState<boolean>(false);

  const {
    data: votedData,
    trigger,
    isMutating,
  } = useSWRMutation(`/api/survey/${surveyId}`, sendRequest);

  useEffect(() => {
    if (votedData?.status === 200) {
      setOptionsDisabled(true);
      mutate();
    }
  }, [votedData]);

  const fetcher: Fetcher<SurveyRespType, string> = (...args) =>
    fetch(...args).then((res) => res.json());

  const { data: singleSurvey, mutate } = useSWR(
    `/api/survey/${surveyId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  const onBack = () => {
    router.back();
  };

  const allTheVotes = useMemo(() => {
    return singleSurvey?.options
      ?.map((i) => i.votes)
      ?.reduce((acc, curr) => (acc ?? 0) + (curr ?? 0), 0);
  }, [singleSurvey]);

  const showPercentage = useMemo(() => {
    return (allTheVotes ?? 0) >= 5 && optionsDisabled;
  }, [allTheVotes, optionsDisabled]);

  const onVote = async (vote: string) => {
    trigger(vote);
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 lg:p-24 ">
      <div className="w-full  overflow-hidden rounded-lg bg-white shadow-md duration-300 ">
        <h1 className="mt-2 text-center text-2xl font-bold text-gray-500">
          {singleSurvey?.question}
        </h1>
        {singleSurvey?.options && singleSurvey?.options?.length && (
          <ul className="flex flex-col gap-5 ">
            {singleSurvey.options.map(
              (option: ResponseOptionType, index: number) => {
                const percentage = (
                  ((option?.votes ?? 0 * 100) / (allTheVotes ?? 1)) *
                  100
                ).toFixed();
                return (
                  <SurveyRow
                    disabled={optionsDisabled}
                    key={`option-${index}`}
                    onClick={() => onVote(option?._id)}
                    label={option?.label}
                    loading={isMutating}
                    percentage={showPercentage ? +percentage : undefined}
                  />
                );
              }
            )}
          </ul>
        )}
      </div>
      {optionsDisabled && <Button label={"Go to list"} onClick={onBack} />}
    </div>
  );
};

export default Page;
