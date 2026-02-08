import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/axios';
import { ImageUpload } from '@/components/ui/image-upload'; // Импорт компонента загрузки
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ProductForm {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function CreateProductPage() {
  const { register, handleSubmit, setValue, watch } = useForm<ProductForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For debugging/feedback
  const imageUrl = watch('imageUrl');
  console.log('Current image URL:', imageUrl);
  const onSubmit = async (data: ProductForm) => {
    setIsSubmitting(true);
    try {
      console.log('Sending data:', data);

      await api.post('/products', {
        ...data,
        price: Number(data.price), // Ensure number type
      });

      alert('Product created successfully!');
      // TODO: Redirect or clear form
    } catch (error) {
      console.error(error);
      alert('Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <h1 className="text-2xl font-bold mb-6 tracking-tight">New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground ml-1">Product Photo</label>
          <ImageUpload
            onUpload={(url) => {
              console.log('Image uploaded:', url);
              setValue('imageUrl', url);
            }}
          />
          {/* Hidden input to ensure validation works if needed later */}
          <input type="hidden" {...register('imageUrl', { required: true })} />
        </div>

        {/* Inputs with "High-End" styling */}
        <div className="space-y-4">
          <Input
            {...register('name', { required: true })}
            placeholder="Product Name"
            className="h-12 rounded-xl bg-secondary/20 border-transparent focus:border-primary/50 text-lg px-4 transition-all"
          />

          <Input
            {...register('price', { required: true })}
            type="number"
            placeholder="Price ($)"
            className="h-12 rounded-xl bg-secondary/20 border-transparent focus:border-primary/50 text-lg px-4 transition-all"
          />

          <Textarea
            {...register('description')}
            placeholder="Description..."
            className="min-h-[120px] rounded-xl bg-secondary/20 border-transparent focus:border-primary/50 text-base p-4 resize-none transition-all"
          />
        </div>

        {/* Floating Bottom Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent z-10">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}
