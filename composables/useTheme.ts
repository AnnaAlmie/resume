import type { TTheme } from "@/types/main";

export const useTheme = () => {
  const theme = useState<TTheme>("theme", () => "dark");

  const applyTheme = () => {
    if (import.meta.client) {
      // SET dark
      theme.value = "dark";
      document.documentElement.setAttribute("data-theme", theme.value);
      document.documentElement.style.colorScheme = theme.value;
    }
  };

  const toggleTheme = async () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    localStorage.setItem("resume-theme", theme.value);
    applyTheme();
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem("resume-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      theme.value = savedTheme;
      applyTheme();
      return;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme.value = "dark";
      applyTheme();
      return;
    }

    applyTheme();
  });

  watch(theme, () => {
    applyTheme();
  });

  return {
    theme,
    toggleTheme,
  };
};
