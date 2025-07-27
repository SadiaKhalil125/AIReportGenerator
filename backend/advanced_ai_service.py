import os
from typing import Optional
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationSummaryMemory

class AdvancedAIService:
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.llm = None
        self.memory = None
        self.user_memories = {}  # Store user-specific memories
        
        if self.openai_api_key:
            try:
                self.llm = ChatOpenAI(
                    api_key=self.openai_api_key,
                    model="gpt-3.5-turbo",
                    temperature=0.7,
                    max_tokens=3000
                )
                # Initialize memory with LLM
                self.memory = ConversationSummaryMemory(llm=self.llm, return_messages=True)
            except Exception as e:
                print(f"Warning: Could not initialize OpenAI client: {e}")
                self.llm = None
                self.memory = None
        else:
            print("No OpenAI API key found. Advanced features will not be available.")
    
    async def generate_enhanced_report(self, topic: str, additional_context: str = "", user_id: int = None) -> str:
        """Generate enhanced report with context and memory"""
        if not self.llm:
            return self._generate_demo_content(topic)
        
        try:
            # Get user memory if available
            user_memory = ""
            if user_id and user_id in self.user_memories:
                user_memory = f"\nUser's previous interests and preferences: {self.user_memories[user_id]}"
            
            enhanced_prompt = PromptTemplate(
                input_variables=["topic", "context", "memory"],
                template="""
                Create a comprehensive, enhanced research report on "{topic}" that incorporates the provided context and user preferences.
                
                Additional Context: {context}
                User Memory/Preferences: {memory}
                
                The report should be structured as follows:
                
                # Executive Summary
                Provide a concise overview of key findings and recommendations.
                
                # Introduction and Background
                - Define the topic and its significance
                - Historical context and evolution
                - Current market landscape
                
                # Detailed Analysis
                - Current state and trends
                - Key players and market dynamics
                - Technological developments
                - Regulatory environment
                
                # Strategic Insights
                - Opportunities and challenges
                - Risk assessment
                - Competitive analysis
                
                # Future Outlook
                - Emerging trends and predictions
                - Market projections
                - Technology roadmap
                
                # Recommendations
                - Strategic recommendations
                - Implementation roadmap
                - Success metrics
                
                # Conclusion
                Summarize key takeaways and next steps.
                
                Make the report professional, data-driven, and actionable. Include specific examples and case studies where relevant.
                """
            )
            
            chain = LLMChain(llm=self.llm, prompt=enhanced_prompt)
            result = await chain.ainvoke({
                "topic": topic,
                "context": additional_context or "No additional context provided",
                "memory": user_memory or "No user memory available"
            })
            
            # Update user memory
            if user_id:
                if user_id not in self.user_memories:
                    self.user_memories[user_id] = ""
                self.user_memories[user_id] += f"\nInterested in: {topic}"
            
            return result.strip()
            
        except Exception as e:
            print(f"Error generating enhanced report: {e}")
            return self._generate_demo_content(topic)
    
    async def generate_report_with_memory(self, topic: str, user_id: int) -> str:
        """Generate personalized report using conversation memory"""
        if not self.llm:
            return self._generate_demo_content(topic)
        
        try:
            # Get conversation history
            conversation_history = ""
            if self.memory and hasattr(self.memory, 'chat_memory'):
                messages = self.memory.chat_memory.messages
                if messages:
                    conversation_history = "\n".join([f"{msg.type}: {msg.content}" for msg in messages[-5:]])
            
            memory_prompt = PromptTemplate(
                input_variables=["topic", "history", "user_id"],
                template="""
                Create a personalized research report on "{topic}" based on the user's conversation history and preferences.
                
                User ID: {user_id}
                Recent Conversation History: {history}
                
                The report should be tailored to the user's interests and previous interactions. Include:
                
                # Personalized Executive Summary
                Address the user's specific interests and concerns.
                
                # Contextual Introduction
                Frame the topic in relation to the user's previous interests.
                
                # Customized Analysis
                Focus on aspects that align with the user's preferences.
                
                # Personalized Recommendations
                Provide recommendations that consider the user's context and history.
                
                # Actionable Next Steps
                Suggest specific actions based on the user's profile.
                
                Make the report feel personalized and relevant to this specific user.
                """
            )
            
            chain = LLMChain(llm=self.llm, prompt=memory_prompt)
            result = await chain.ainvoke({
                "topic": topic,
                "history": conversation_history or "No conversation history available",
                "user_id": user_id
            })
            
            # Update memory
            if self.memory:
                self.memory.save_context(
                    {"input": f"Generated report on: {topic}"},
                    {"output": "Report generated successfully"}
                )
            
            return result.strip()
            
        except Exception as e:
            print(f"Error generating memory-based report: {e}")
            return self._generate_demo_content(topic)
    
    def _generate_demo_content(self, topic: str) -> str:
        """Generate demo content when AI service is not available"""
        return f"""# Executive Summary
This report provides a comprehensive analysis of {topic}, examining current trends, challenges, and opportunities in this dynamic field.

# Introduction and Background
{topic} represents a significant area of interest in today's business and technology landscape. This analysis explores various aspects of this domain to provide actionable insights.

# Current State Analysis
The current state of {topic} is characterized by rapid evolution and innovation. Key developments include technological advancements, market expansion, and regulatory changes.

# Key Findings and Insights
• Growing market demand and adoption
• Technological innovation driving growth
• Regulatory environment evolving
• Competitive landscape intensifying

# Challenges and Opportunities
Challenges include regulatory uncertainty and market volatility. Opportunities exist in emerging markets and technological innovation.

# Future Trends and Predictions
Continued growth expected with increased automation and digital transformation.

# Recommendations
Organizations should invest in technology, build partnerships, and stay informed about regulatory changes.

# Conclusion
{topic} offers significant opportunities for organizations that can navigate challenges effectively and capitalize on emerging trends.""" 