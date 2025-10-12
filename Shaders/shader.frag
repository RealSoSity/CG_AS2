#version 330 core

in vec4 vCol;
in vec2 TextCoord;
in vec3 FragPos;
in vec3 Normal;
out vec4 colour;

uniform vec3 lightColour;
uniform vec3 lightPos;
uniform vec3 viewPos;

uniform sampler2D texture1;

vec3 ambientLight(float intensity)
{
    float ambientStrength = 0.08f;
    vec3 ambient = (lightColour * intensity) * ambientStrength;
    return ambient;
}

vec3 diffuseLight(float intensity)
{
    float diffuseStrength = 1.0f;

    vec3 lightDir = normalize(lightPos - FragPos);
    vec3 norm = normalize(Normal);

    float diff = max(dot(norm, lightDir), 0.0f);
    vec3 diffuse = (lightColour * intensity) * diff * diffuseStrength;
    return diffuse;
}

vec3 specularLight(float intensity)
{
    float specularStrength = 0.5f;
    float shininess = 64.0f;

    vec3 lightDir = normalize(lightPos - FragPos);
    vec3 norm = normalize(Normal);
    vec3 reflectDir = reflect(-lightDir, norm);
    vec3 viewDir = normalize(viewPos - FragPos);

    float spec = pow(max(dot(viewDir, reflectDir), 0.0f), shininess);
    
    vec3 specular = (lightColour * intensity) * spec * specularStrength;
    return specular;
}

void main()
{
    float intensity = 2.5f;
    colour = texture(texture1, TextCoord) * vec4(ambientLight(intensity) + diffuseLight(intensity) + specularLight(intensity), 1.0); 
}