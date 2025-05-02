export const useAddSectionButton = () => {
  const handleAddSection = () => {
    console.log("Add section clicked");
  };

  return {
    handleAddSection,
  };
}; 