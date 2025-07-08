import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Welcome() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#D1FAE5] text-[#111827] text-center">
      <h1 className="text-5xl font-extrabold mb-6 text-[#14B8A6]">{t("welcome.title")}</h1>
      <p className="mb-12 text-xl max-w-lg">{t("welcome.description")}</p>
      <div className="space-x-6">
        <Link
          to="/login"
          className="inline-block px-8 py-3 bg-[#14B8A6] text-white rounded-lg font-semibold hover:bg-[#0d9488] transition"
        >
          {t("auth.login")}
        </Link>
        <Link
          to="/signup"
          className="inline-block px-8 py-3 border-2 border-[#14B8A6] text-[#14B8A6] rounded-lg font-semibold hover:text-white hover:bg-[#F97316] transition"
        >
          {t("auth.signup")}
        </Link>
      </div>
    </div>
  );
}



