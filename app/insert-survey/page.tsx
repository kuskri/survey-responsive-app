"use client";
import { SurveyType } from "@/models/Survey";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";

async function sendRequest(url: string, { arg }: { arg: SurveyType }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
}

const InsertSurvey: FC = () => {
  const router = useRouter();

  const { data, trigger, isMutating } = useSWRMutation(
    "/api/survey",
    sendRequest
  );

  useEffect(() => {
    if (data?.status === 201) onBack();
  }, [data]);

  const [form, setForm] = useState({
    question: "",
    op1: "",
    op2: "",
    op3: "",
    op4: "",
  });

  const onBack = () => {
    router.back();
  };

  const onFromSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const item: SurveyType = {
      question: form.question,
      options: [
        { label: form.op1 },
        { label: form.op2 },
        { label: form.op3 },
        { label: form.op4 },
      ],
    };
    await trigger({
      ...item,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const inputClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 lg:p-24 ">
      <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 ">
        <h1 className="mt-2 text-center text-2xl font-bold text-gray-500">
          Survey
        </h1>

        <form onSubmit={(e) => onFromSubmit(e)}>
          <div className="flex flex-col mb-6 p-6 lg:p-16 mx-auto">
            <div className="block mb-2">
              <label
                htmlFor="question"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Question <span className="text-slate-500">*</span>
              </label>
              <input
                type="text"
                id="question"
                name="question"
                className={inputClass}
                placeholder="Your survey's question"
                required
                onChange={handleChange}
              />
            </div>
            <div className="block mb-2">
              <label
                htmlFor="op1"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Option 1 <span className="text-slate-500">*</span>
              </label>
              <input
                type="text"
                id="op1"
                name="op1"
                className={inputClass}
                placeholder="Your survey's first option"
                required
                onChange={handleChange}
              />
            </div>
            <div className="block mb-2">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Option 2 <span className="text-slate-500">*</span>
              </label>
              <input
                type="text"
                id="op2"
                name="op2"
                className={inputClass}
                placeholder="Your survey's second option"
                required
                onChange={handleChange}
              />
            </div>
            <div className="block mb-2">
              <label
                htmlFor="op3"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Option 3
              </label>
              <input
                type="text"
                id="op3"
                name="op3"
                className={inputClass}
                placeholder="Your survey's third option"
                onChange={handleChange}
              />
            </div>
            <div className="block mb-2">
              <label
                htmlFor="op4"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Option 4
              </label>
              <input
                type="text"
                id="op4"
                name="op4"
                className={inputClass}
                placeholder="Your survey's fourth option"
                onChange={handleChange}
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center mb-2">
            * Input is required
          </p>
          <div className="gap-4 bg-gray-100 py-4 text-center flex flex-row justify-around">
            <Button
              label="Back"
              onClick={onBack}
              color="red"
              disabled={isMutating}
            />
            <Button
              isLoading={isMutating}
              disabled={!(form.question && form.op1 && form.op2)}
              label="Add"
              color="green"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsertSurvey;
