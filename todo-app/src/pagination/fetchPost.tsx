export const fetchPosts = async (page: number) => {
  const url = page
    ? `http://localhost:2000/tasks?_page=${page}&_per_page=5`
    : "http://localhost:2000/tasks";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts. Status: ${response.status}`);
  }
  const postData = await response.json();
  return postData;
};
