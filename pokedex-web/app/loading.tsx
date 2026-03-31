export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-xl font-medium animate-pulse text-muted-foreground italic">Gotta catch &#39;em all...</p>
      </div>
    </div>
  );
}
