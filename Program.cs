using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseStaticFiles();
app.MapGet("/", () => Results.Content(File.ReadAllText("wwwroot/index.html"), "text/html"));
app.UseMiddleware<JavaScriptFileMiddleware>();
app.Run();


public class JavaScriptFileMiddleware
{
    private readonly RequestDelegate next;

    public JavaScriptFileMiddleware(RequestDelegate next)
    {
        this.next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        await next(context);

        if (!context.Response.HasStarted)
        {
            string jsPath = Path.Combine("wwwroot", context.Request.Path.Value?.Substring(1) + ".js");
            if (File.Exists(jsPath))
            {
                context.Response.ContentType = "text/javascript";
                context.Response.StatusCode = 200;
                await context.Response.WriteAsync(File.ReadAllText(jsPath));
            }
        }
    }
}