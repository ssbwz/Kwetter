FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY api_gateway/*.csproj ./
RUN dotnet restore



COPY *.sln ./
COPY . ./

# Build the application
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

ENTRYPOINT ["dotnet", "api_gateway.dll"]