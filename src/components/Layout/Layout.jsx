import css from "./Layou.module.css";
import { Suspense } from "react";

export const Layout = ({ children }) => {
  return (
    <div className={css.layout}>
      <main className={css.container}>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </div>
  );
};
