export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_assets: {
        Row: {
          api_call_count: number | null
          asset_type: Database["public"]["Enums"]["asset_type"]
          created_at: string
          current_price: number | null
          custom_license_terms: string | null
          description: string | null
          download_count: number | null
          file_path: string | null
          github_url: string | null
          id: string
          initial_price: number | null
          license_type: Database["public"]["Enums"]["license_type"]
          model_url: string | null
          name: string
          owner_id: string
          rating: number | null
          rating_count: number | null
          status: Database["public"]["Enums"]["asset_status"] | null
          tags: string[] | null
          ticker_symbol: string
          total_revenue: number | null
          updated_at: string
        }
        Insert: {
          api_call_count?: number | null
          asset_type: Database["public"]["Enums"]["asset_type"]
          created_at?: string
          current_price?: number | null
          custom_license_terms?: string | null
          description?: string | null
          download_count?: number | null
          file_path?: string | null
          github_url?: string | null
          id?: string
          initial_price?: number | null
          license_type: Database["public"]["Enums"]["license_type"]
          model_url?: string | null
          name: string
          owner_id: string
          rating?: number | null
          rating_count?: number | null
          status?: Database["public"]["Enums"]["asset_status"] | null
          tags?: string[] | null
          ticker_symbol: string
          total_revenue?: number | null
          updated_at?: string
        }
        Update: {
          api_call_count?: number | null
          asset_type?: Database["public"]["Enums"]["asset_type"]
          created_at?: string
          current_price?: number | null
          custom_license_terms?: string | null
          description?: string | null
          download_count?: number | null
          file_path?: string | null
          github_url?: string | null
          id?: string
          initial_price?: number | null
          license_type?: Database["public"]["Enums"]["license_type"]
          model_url?: string | null
          name?: string
          owner_id?: string
          rating?: number | null
          rating_count?: number | null
          status?: Database["public"]["Enums"]["asset_status"] | null
          tags?: string[] | null
          ticker_symbol?: string
          total_revenue?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ai_suggestions: {
        Row: {
          accepted: boolean | null
          created_at: string | null
          customer_id: string | null
          id: string
          input_data: Json | null
          reasoning: string | null
          restaurant_id: string | null
          suggested_items: Json | null
          suggestion_type: string | null
        }
        Insert: {
          accepted?: boolean | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          input_data?: Json | null
          reasoning?: string | null
          restaurant_id?: string | null
          suggested_items?: Json | null
          suggestion_type?: string | null
        }
        Update: {
          accepted?: boolean | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          input_data?: Json | null
          reasoning?: string | null
          restaurant_id?: string | null
          suggested_items?: Json | null
          suggestion_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_suggestions_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          event_data: Json | null
          event_type: string
          id: string
          restaurant_id: string | null
          session_id: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          event_data?: Json | null
          event_type: string
          id?: string
          restaurant_id?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          event_data?: Json | null
          event_type?: string
          id?: string
          restaurant_id?: string | null
          session_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      ar_themes: {
        Row: {
          active: boolean | null
          ar_assets_url: string | null
          created_at: string | null
          id: string
          restaurant_id: string | null
          theme_name: string
          theme_type: string | null
        }
        Insert: {
          active?: boolean | null
          ar_assets_url?: string | null
          created_at?: string | null
          id?: string
          restaurant_id?: string | null
          theme_name: string
          theme_type?: string | null
        }
        Update: {
          active?: boolean | null
          ar_assets_url?: string | null
          created_at?: string | null
          id?: string
          restaurant_id?: string | null
          theme_name?: string
          theme_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ar_themes_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_reviews: {
        Row: {
          asset_id: string
          created_at: string
          id: string
          rating: number
          review_text: string | null
          reviewer_id: string
        }
        Insert: {
          asset_id: string
          created_at?: string
          id?: string
          rating: number
          review_text?: string | null
          reviewer_id: string
        }
        Update: {
          asset_id?: string
          created_at?: string
          id?: string
          rating?: number
          review_text?: string | null
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_reviews_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "ai_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_transactions: {
        Row: {
          amount: number
          asset_id: string
          buyer_id: string | null
          created_at: string
          id: string
          payment_method: string | null
          royalty_amount: number
          transaction_type: string
        }
        Insert: {
          amount: number
          asset_id: string
          buyer_id?: string | null
          created_at?: string
          id?: string
          payment_method?: string | null
          royalty_amount: number
          transaction_type: string
        }
        Update: {
          amount?: number
          asset_id?: string
          buyer_id?: string | null
          created_at?: string
          id?: string
          payment_method?: string | null
          royalty_amount?: number
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_transactions_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "ai_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_loyalty: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          last_visit: string | null
          points: number | null
          restaurant_id: string | null
          tier: string | null
          total_spent: number | null
          updated_at: string | null
          visits_count: number | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          last_visit?: string | null
          points?: number | null
          restaurant_id?: string | null
          tier?: string | null
          total_spent?: number | null
          updated_at?: string | null
          visits_count?: number | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          last_visit?: string | null
          points?: number | null
          restaurant_id?: string | null
          tier?: string | null
          total_spent?: number | null
          updated_at?: string | null
          visits_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_loyalty_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      dine_tokens: {
        Row: {
          amount: number
          created_at: string | null
          customer_id: string | null
          expiry_date: string | null
          id: string
          order_id: string | null
          restaurant_id: string | null
          token_type: string | null
          transaction_hash: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          customer_id?: string | null
          expiry_date?: string | null
          id?: string
          order_id?: string | null
          restaurant_id?: string | null
          token_type?: string | null
          transaction_hash?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          customer_id?: string | null
          expiry_date?: string | null
          id?: string
          order_id?: string | null
          restaurant_id?: string | null
          token_type?: string | null
          transaction_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dine_tokens_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dine_tokens_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      food_health_scores: {
        Row: {
          alternative_suggestions: string[] | null
          created_at: string | null
          health_score: number | null
          health_tags: string[] | null
          id: string
          menu_item_id: string | null
          nutritional_data: Json | null
        }
        Insert: {
          alternative_suggestions?: string[] | null
          created_at?: string | null
          health_score?: number | null
          health_tags?: string[] | null
          id?: string
          menu_item_id?: string | null
          nutritional_data?: Json | null
        }
        Update: {
          alternative_suggestions?: string[] | null
          created_at?: string | null
          health_score?: number | null
          health_tags?: string[] | null
          id?: string
          menu_item_id?: string | null
          nutritional_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "food_health_scores_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      health_profiles: {
        Row: {
          allergies: string[] | null
          calorie_target: number | null
          created_at: string | null
          customer_id: string | null
          dietary_restrictions: string[] | null
          fitness_goals: string[] | null
          health_conditions: string[] | null
          id: string
          preferred_cuisines: string[] | null
          updated_at: string | null
        }
        Insert: {
          allergies?: string[] | null
          calorie_target?: number | null
          created_at?: string | null
          customer_id?: string | null
          dietary_restrictions?: string[] | null
          fitness_goals?: string[] | null
          health_conditions?: string[] | null
          id?: string
          preferred_cuisines?: string[] | null
          updated_at?: string | null
        }
        Update: {
          allergies?: string[] | null
          calorie_target?: number | null
          created_at?: string | null
          customer_id?: string | null
          dietary_restrictions?: string[] | null
          fitness_goals?: string[] | null
          health_conditions?: string[] | null
          id?: string
          preferred_cuisines?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      loyalty_programs: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          points_per_dollar: number | null
          restaurant_id: string | null
          reward_threshold: number | null
          reward_value: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          points_per_dollar?: number | null
          restaurant_id?: string | null
          reward_threshold?: number | null
          reward_value?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          points_per_dollar?: number | null
          restaurant_id?: string | null
          reward_threshold?: number | null
          reward_value?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_programs_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          ai_generated: boolean | null
          allergens: string[] | null
          availability: boolean | null
          calories: number | null
          category: string | null
          created_at: string | null
          cuisine_fusion: string[] | null
          description: string | null
          dietary_info: string[] | null
          id: string
          image_url: string | null
          ingredients: string[] | null
          mood_tags: string[] | null
          name: string
          occasion_tags: string[] | null
          preparation_time: number | null
          price: number
          restaurant_id: string | null
          updated_at: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          allergens?: string[] | null
          availability?: boolean | null
          calories?: number | null
          category?: string | null
          created_at?: string | null
          cuisine_fusion?: string[] | null
          description?: string | null
          dietary_info?: string[] | null
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          mood_tags?: string[] | null
          name: string
          occasion_tags?: string[] | null
          preparation_time?: number | null
          price: number
          restaurant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          allergens?: string[] | null
          availability?: boolean | null
          calories?: number | null
          category?: string | null
          created_at?: string | null
          cuisine_fusion?: string[] | null
          description?: string | null
          dietary_info?: string[] | null
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          mood_tags?: string[] | null
          name?: string
          occasion_tags?: string[] | null
          preparation_time?: number | null
          price?: number
          restaurant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_email: string | null
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          estimated_completion_time: string | null
          id: string
          items: Json
          order_type: string | null
          payment_method: string | null
          payment_status: string | null
          restaurant_id: string | null
          special_instructions: string | null
          status: string | null
          subtotal: number
          table_number: number | null
          tax_amount: number | null
          tip_amount: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          estimated_completion_time?: string | null
          id?: string
          items: Json
          order_type?: string | null
          payment_method?: string | null
          payment_status?: string | null
          restaurant_id?: string | null
          special_instructions?: string | null
          status?: string | null
          subtotal: number
          table_number?: number | null
          tax_amount?: number | null
          tip_amount?: number | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          estimated_completion_time?: string | null
          id?: string
          items?: Json
          order_type?: string | null
          payment_method?: string | null
          payment_status?: string | null
          restaurant_id?: string | null
          special_instructions?: string | null
          status?: string | null
          subtotal?: number
          table_number?: number | null
          tax_amount?: number | null
          tip_amount?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      price_history: {
        Row: {
          asset_id: string
          id: string
          price: number
          timestamp: string
          volume: number | null
        }
        Insert: {
          asset_id: string
          id?: string
          price: number
          timestamp?: string
          volume?: number | null
        }
        Update: {
          asset_id?: string
          id?: string
          price?: number
          timestamp?: string
          volume?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "price_history_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "ai_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          address: string | null
          created_at: string | null
          cuisine_type: string | null
          description: string | null
          email: string | null
          features_enabled: string[] | null
          id: string
          max_tables: number | null
          monthly_revenue: number | null
          name: string
          operating_hours: Json | null
          owner_id: string | null
          phone: string | null
          plan_type: string | null
          status: string | null
          subscription_tier: string | null
          tenant_id: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          cuisine_type?: string | null
          description?: string | null
          email?: string | null
          features_enabled?: string[] | null
          id?: string
          max_tables?: number | null
          monthly_revenue?: number | null
          name: string
          operating_hours?: Json | null
          owner_id?: string | null
          phone?: string | null
          plan_type?: string | null
          status?: string | null
          subscription_tier?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          cuisine_type?: string | null
          description?: string | null
          email?: string | null
          features_enabled?: string[] | null
          id?: string
          max_tables?: number | null
          monthly_revenue?: number | null
          name?: string
          operating_hours?: Json | null
          owner_id?: string | null
          phone?: string | null
          plan_type?: string | null
          status?: string | null
          subscription_tier?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      smart_tables: {
        Row: {
          created_at: string | null
          current_session_id: string | null
          id: string
          last_cleaned: string | null
          nfc_tag_id: string | null
          qr_code_url: string | null
          restaurant_id: string | null
          status: string | null
          table_number: number
        }
        Insert: {
          created_at?: string | null
          current_session_id?: string | null
          id?: string
          last_cleaned?: string | null
          nfc_tag_id?: string | null
          qr_code_url?: string | null
          restaurant_id?: string | null
          status?: string | null
          table_number: number
        }
        Update: {
          created_at?: string | null
          current_session_id?: string | null
          id?: string
          last_cleaned?: string | null
          nfc_tag_id?: string | null
          qr_code_url?: string | null
          restaurant_id?: string | null
          status?: string | null
          table_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "smart_tables_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_members: {
        Row: {
          active: boolean | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          performance_metrics: Json | null
          phone: string | null
          restaurant_id: string | null
          role: string | null
          shift_schedule: Json | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          performance_metrics?: Json | null
          phone?: string | null
          restaurant_id?: string | null
          role?: string | null
          shift_schedule?: Json | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          performance_metrics?: Json | null
          phone?: string | null
          restaurant_id?: string | null
          role?: string | null
          shift_schedule?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_members_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      table_feedback: {
        Row: {
          emotion_data: Json | null
          feedback_text: string | null
          id: string
          restaurant_id: string | null
          service_rating: number | null
          staff_id: string | null
          table_number: number | null
          timestamp: string | null
        }
        Insert: {
          emotion_data?: Json | null
          feedback_text?: string | null
          id?: string
          restaurant_id?: string | null
          service_rating?: number | null
          staff_id?: string | null
          table_number?: number | null
          timestamp?: string | null
        }
        Update: {
          emotion_data?: Json | null
          feedback_text?: string | null
          id?: string
          restaurant_id?: string | null
          service_rating?: number | null
          staff_id?: string | null
          table_number?: number | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "table_feedback_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          bio: string | null
          company: string | null
          created_at: string
          full_name: string | null
          github_username: string | null
          id: string
          total_earnings: number | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          bio?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          github_username?: string | null
          id: string
          total_earnings?: number | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          bio?: string | null
          company?: string | null
          created_at?: string
          full_name?: string | null
          github_username?: string | null
          id?: string
          total_earnings?: number | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      voice_orders: {
        Row: {
          audio_file_url: string | null
          confidence_score: number | null
          created_at: string | null
          id: string
          order_id: string | null
          processed_intent: Json | null
          transcription: string | null
        }
        Insert: {
          audio_file_url?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          processed_intent?: Json | null
          transcription?: string | null
        }
        Update: {
          audio_file_url?: string | null
          confidence_score?: number | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          processed_intent?: Json | null
          transcription?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voice_orders_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_ticker_symbol: {
        Args: Record<PropertyKey, never> | { asset_name: string }
        Returns: string
      }
      update_asset_price: {
        Args: { asset_id_param: string }
        Returns: number
      }
    }
    Enums: {
      asset_status: "pending" | "approved" | "rejected" | "delisted"
      asset_type:
        | "model"
        | "dataset"
        | "api"
        | "framework"
        | "tool"
        | "company_share"
      license_type:
        | "mit"
        | "apache"
        | "commercial"
        | "proprietary"
        | "cc0"
        | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      asset_status: ["pending", "approved", "rejected", "delisted"],
      asset_type: [
        "model",
        "dataset",
        "api",
        "framework",
        "tool",
        "company_share",
      ],
      license_type: [
        "mit",
        "apache",
        "commercial",
        "proprietary",
        "cc0",
        "custom",
      ],
    },
  },
} as const
