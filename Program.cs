using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
		Path.Combine(builder.Environment.ContentRootPath, "Examples")),
		RequestPath = "/Examples"
});
app.MapGet("/", () => Results.Content(File.ReadAllText("index.html"), "text/html"));

app.Run();
