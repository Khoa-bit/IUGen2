import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import Table from "../../components/Table";
import { parseClassInput } from "../../lib/classInput";
import { generateSchedule, _extractDates } from "../../lib/schedule";

interface Inputs {
  copiedStr: string;
}

const HookForm: NextPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(parseClassInput(data.copiedStr));
  };

  const rawInputString =
    "IT092IU \tIT092IU \t Principles of Programming Languages \t01\t01\t4\t4\tITIT19CS1\t35 \tFull \t *   \t Fri   Sat \t 7   1 \t 4   3 \t LA1.607   ONLINE \t N.Q.Phú   Q.T.Tho \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT092IU \tIT092IU \t Principles of Programming Languages \t01\t02\t4\t4\tITIT19CS1\t35 \t1 \t *   \t Mon   Sat \t 1   1 \t 4   3 \t LA1.607   ONLINE \t N.Q.Phú   Q.T.Tho \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT093IU \tIT093IU \t Web Application Development \t01\t03\t4\t4\tITIT19CS1\t30 \t16 \t *   \t Fri   Tue \t 7   7 \t 4   3 \t LA1.605   ONLINE \t N.V.Sinh   N.V.Sinh \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT093IU \tIT093IU \t Web Application Development \t01\t02\t4\t4\tITIT19CS1\t30 \tFull \t *   \t Thu   Tue \t 7   7 \t 4   3 \t LA1.606   ONLINE \t P.Q.S.Lam   N.V.Sinh \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT093IU \tIT093IU \t Web Application Development \t01\t01\t4\t4\tITIT19CS1\t30 \tFull \t *   \t Sat   Tue \t 7   7 \t 4   3 \t LA1.608   ONLINE \t P.Q.S.Lam   N.V.Sinh \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT097IU \tIT097IU \t Introduction to Artificial Intelligence \t01\t01\t4\t4\tITIT19CS1\t35 \t2 \t *   \t Wed   Fri \t 1   1 \t 4   3 \t LA1.606   ONLINE \t P.Q.S.Lam   L.T.Sach \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tIT097IU \tIT097IU \t Introduction to Artificial Intelligence \t01\t02\t4\t4\tITIT19CS1\t35 \t11 \t *   \t Wed   Fri \t 7   1 \t 4   3 \t LA1.606   ONLINE \t P.Q.S.Lam   L.T.Sach \t 07/03/2022--15/05/2022   07/02/2022--05/06/2022 \tPE018IU \tPE018IU \t History of Vietnamese Communist Party \t10\t\t2\t2\tITIT19CS1\t75 \t2 \t \t Wed \t 9 \t 2 \t ONLINE \t H.Y.Linh \t 07/02/2022--05/06/2022 \tPE019IU \tPE019IU \t Ho Chi Minh's Thoughts \t10\t\t2\t2\tITIT19CS1\t75 \tFull \t \t Wed \t 7 \t 2 \t ONLINE \t P.T.T.Huong \t 07/02/2022--05/06/2022";

  const resultCoursesMap = parseClassInput(rawInputString);

  const courseKeys: string[] = Array.from(resultCoursesMap.keys());

  const schedules = generateSchedule({
    coursesMap: resultCoursesMap,
    courseKeys,
  });

  return (
    <>
      <h1 className="text-3xl font-bold"> React Hook Form </h1>
      <form
        className="flex flex-col w-1/3 mx-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="copiedStr">Date</label>
        <textarea
          {...register("copiedStr", { required: true })}
          className="border-2 border-sky-800 mb-4"
          id="copiedStr"
        />
        <input className="border-2 bg-fuchsia-400" type="submit" />
      </form>
      <hr />
      <Table coursesMap={resultCoursesMap} schedule={schedules[0]}></Table>
    </>
  );
};

export default HookForm;
