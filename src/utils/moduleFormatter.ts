const formatModule = (module: Record<string, unknown>, targetKey: string) => {
  const match = Object.keys(module).find((key) =>
    key.endsWith(`/${targetKey}`),
  );

  return match ? (module[match] as { default: string }).default : "";
};

export default formatModule;
