"use client";
import Button from "../components/Button";
import SurveyListRow from "@/app/components/SurveyRow";
import { SurveyType } from "@/models/Survey";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import useSWR from "swr";

interface SurveyRespType extends SurveyType {
  _id: string;
}

const SurveyList: FC = () => {
  const router = useRouter();

  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

  const { data } = useSWR(`http://localhost:3000/api/survey`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  const onClickRow = (id = "") => {
    router.push(`survey/${id}`);
  };
  const onEnterSurvey = () => {
    router.push(`insert-survey`);
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mt-32 flex flex-col items-center">
        {data && data.length && (
          <div className="px-4 sm:px-8 max-w-5xl m-auto">
            <h1 className="mt-2 text-center text-2xl font-bold text-gray-500">
              Surveys
            </h1>
            <p className="mt-2 text-center text-xs mb-4 text-gray-500">
              Choose which survey you want to take
            </p>
            <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
              {data.map((item: SurveyRespType) => {
                return (
                  <SurveyListRow
                    label={item.question}
                    onClick={() => onClickRow(item._id)}
                    key={`row-${item._id}`}
                  />
                );
              })}
            </ul>
          </div>
        )}
        <div className="mt-6">
          <Button label="Add your own survey" onClick={onEnterSurvey} />
        </div>
      </div>
    </div>
  );
};

export default SurveyList;
