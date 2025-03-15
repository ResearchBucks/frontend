#!/bin/bash

# Function to start containers
start_containers() {
    local env=$1
    
    echo "🚀 Starting $env environment..."
    if docker-compose --profile "$env" up -d; then
        if [ "$env" = "dev" ]; then
            local port=3000  # Default Next.js port
        else 
            local port=8080  # Port for production
        fi
        
        echo "🌐 Application is accessible at: http://localhost:$port"
    else
        echo "❌ Failed to start $env environment"
    fi
}

# Function to stop containers
stop_containers() {
    local env=$1
    
    echo "🛑 Stopping $env environment..."
    if docker-compose --profile "$env" down; then
        echo "✅ Environment stopped successfully"
    else
        echo "❌ Failed to stop $env environment"
    fi
}

# Function to view logs
view_logs() {
    local env=$1
    
    echo "📋 Showing logs for $env environment..."
    docker-compose --profile "$env" logs -f
}

# Main menu
echo "🐋 Next.js Docker Environment Manager"
echo "------------------------------------"
echo "Choose an action:"
echo "1. 🚀 Start containers"
echo "2. 🛑 Stop containers"
echo "3. 📋 View logs"
read -p "Enter choice (1-3): " choice

echo -e "\nChoose environment:"
echo "1. 🛠️  Development"
echo "2. 🌐 Production"
echo "3. 🔄 Both"
read -p "Enter environment choice (1-3): " env_choice

case $env_choice in
    1) env="dev";;
    2) env="prod";;
    3) env="both";;
    *) echo "❌ Invalid choice"; exit 1;;
esac

case $choice in
    1)  
        if [ "$env" = "both" ]; then
            echo "🔄 Starting both environments..."
            start_containers "dev"
            start_containers "prod"
        else
            start_containers "$env"
        fi
        ;;
    2)  
        if [ "$env" = "both" ]; then
            echo "🔄 Stopping both environments..."
            stop_containers "dev"
            stop_containers "prod"
        else
            stop_containers "$env"
        fi
        ;;
    3)  
        if [ "$env" = "both" ]; then
            echo "📋 Showing logs for both environments..."
            view_logs "dev"
            view_logs "prod"
        else
            view_logs "$env"
        fi
        ;;
    *) echo "❌ Invalid choice";;
esac