import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import z from "zod";
import { PushTicketForm } from "../configs";

type AddTicketFormProps = {
  onSubmit: (values: PushTicketForm) => void;
};

export default function AddTicketForm({ onSubmit }: AddTicketFormProps) {
  const form = useForm<PushTicketForm>({
    initialValues: {
      description: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema),
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={25} w="100%">
        <TextInput
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />

        <Button mt={10} type="submit">
          Create
        </Button>
      </Stack>
    </form>
  );
}

const schema = z.object({
  description: z.string().trim().min(1, "Please enter description"),
});
