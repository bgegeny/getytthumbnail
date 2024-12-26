import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  Center,
  Container,
  Heading,
  HStack,
  VStack,
  Input,
  Image,
  Link,
} from "@chakra-ui/react";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [thumbnailLinks, setThumbnailLinks] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");

  const handleSearch = () => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if (youtubeRegex.test(videoUrl)) {
      const videoId =
        videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop();
      setThumbnailLinks([
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      ]);
      setPreviewImage(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
      setErrorMessage("");
      sessionStorage.setItem("ytThumbnailsVideoUrl", videoUrl);
    } else {
      setErrorMessage("Invalid YouTube URL");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      setPreviewImage("");
      setThumbnailLinks([]);
      sessionStorage.setItem("ytThumbnailsVideoUrl", '');
    }
  };

  useEffect(() => {
    const url = sessionStorage.getItem("ytThumbnailsVideoUrl");
    if(url) {
      const videoId =
      url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
      setVideoUrl(url);
      setPreviewImage(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
      setThumbnailLinks([
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      ]);
      setErrorMessage("");
    }
  }, []);

  return (
    <Container p="10" color={"gray.50"} maxW="container.lg">
      <Center mb={10}>
        <Heading>Get Youtube Thumbnail</Heading>
      </Center>
      <Center>
        <VStack>
          <HStack>
            <Field orientation="horizontal" label="VIDEO URL:">
              <Input
                w="600px"
                flex="1"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </Field>
            <Button
              variant="solid"
              bgColor={"whiteAlpha.950"}
              color={"red.950"}
              onClick={handleSearch}
            >
              Search
            </Button>
          </HStack>
          {errorMessage && (
            <Center mt={2} color="red.500">
              Invalid YouTube URL
            </Center>
          )}
          {previewImage && (
            <Center mt={5}>
              <Image src={previewImage} alt="thumbnail" />
            </Center>
          )}
          {thumbnailLinks.length > 0 && (
            <VStack mt={5}>
              {thumbnailLinks.map((thumbnail, index) => (
                <Link
                  key={thumbnail + index}
                  color="whiteAlpha.950"
                  href={thumbnail}
                >
                  {thumbnail}
                </Link>
              ))}
            </VStack>
          )}
        </VStack>
      </Center>
    </Container>
  );
}

export default App;
