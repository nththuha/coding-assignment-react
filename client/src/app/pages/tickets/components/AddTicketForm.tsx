import { Box, Button, LoadingOverlay, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import z from "zod";
import { PushTicketForm } from "../configs";

type AddTicketFormProps = {
  onSubmit: (values: PushTicketForm) => void;
};

export default function AddTicketForm({ onSubmit }: AddTicketFormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<PushTicketForm>({
    initialValues: {
      description: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema),
  });

  const submit = async (values: PushTicketForm) => {
    setLoading(true);
    onSubmit(values);
    setLoading(false);
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <form onSubmit={form.onSubmit(submit)}>
        <Stack gap={15} w="100%">
          <Textarea
            label="Description"
            withAsterisk
            autosize
            minRows={3}
            {...form.getInputProps("description")}
          />

          <Button mt={10} type="submit">
            Create
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

const schema = z.object({
  description: z.string().trim().min(1, "Please enter description"),
});
